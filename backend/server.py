from importlib import import_module
try:
    _fastapi = import_module("fastapi")
    FastAPI = _fastapi.FastAPI
    APIRouter = _fastapi.APIRouter
    HTTPException = _fastapi.HTTPException
except Exception:
    class FastAPI:
        def __init__(self, *args, **kwargs):
            pass

        def include_router(self, *args, **kwargs):
            pass

        def add_middleware(self, *args, **kwargs):
            pass

        def on_event(self, *args, **kwargs):
            def decorator(func):
                return func
            return decorator

    class APIRouter:
        def __init__(self, *args, **kwargs):
            pass

        def get(self, *args, **kwargs):
            def decorator(func):
                return func
            return decorator

        def post(self, *args, **kwargs):
            def decorator(func):
                return func
            return decorator

    class HTTPException(Exception):
        def __init__(self, status_code: int = 500, detail: str = ""):
            self.status_code = status_code
            self.detail = detail
            super().__init__(detail)
try:
    StreamingResponse = import_module("fastapi.responses").StreamingResponse
except Exception:
    class StreamingResponse:
        def __init__(self, *args, **kwargs):
            pass
try:
    load_dotenv = import_module("dotenv").load_dotenv
except Exception:
    def load_dotenv(*args, **kwargs):
        return False
try:
    CORSMiddleware = import_module("fastapi.middleware.cors").CORSMiddleware
except Exception:
    class CORSMiddleware:
        def __init__(self, app, **kwargs):
            self.app = app
try:
    _pydantic = import_module("pydantic")
    BaseModel = _pydantic.BaseModel
    Field = _pydantic.Field
    EmailStr = getattr(_pydantic, "EmailStr", str)
except ImportError:
    # Fallback for environments where pydantic is not installed (e.g. some linters/CI).
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)

        def model_dump(self):
            return self.__dict__

    def Field(default=None, default_factory=None, **kwargs):
        if default_factory is not None:
            return default_factory()
        return default

    EmailStr = str
from typing import Optional, List
from datetime import datetime, timezone
from pathlib import Path
import os
import uuid
import logging
from email_service import send_company_email, send_customer_email

AsyncIOMotorClient = None
try:
    AsyncIOMotorClient = import_module("motor.motor_asyncio").AsyncIOMotorClient
except ImportError:
    pass

_HAS_EMERGENT = False
class UserMessage:
    def __init__(self, text: str):
        self.text = text

class TextDelta:
    def __init__(self, content: str):
        self.content = content

class StreamDone:
    pass

class LlmChat:
    def __init__(self, *args, **kwargs):
        raise RuntimeError("emergentintegrations.llm.chat is not available")

try:
    _emergent_module = import_module("emergentintegrations.llm.chat")
    LlmChat = _emergent_module.LlmChat
    UserMessage = _emergent_module.UserMessage
    TextDelta = _emergent_module.TextDelta
    StreamDone = _emergent_module.StreamDone
    _HAS_EMERGENT = True
except Exception:
    # emergentintegrations may not be installed in some environments (e.g. linters/CI).
    # Provide a clear fallback so import-time failure doesn't break the app. The
    # chat endpoint will return an error if the module is not available at runtime.
    pass

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="ZJ Infosystem API")
api_router = APIRouter(prefix="/api")

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")
COMPANY_EMAIL = os.environ.get("COMPANY_EMAIL", "info@zjinfosystem.com")

logger = logging.getLogger("zj")
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")


# ---------------- Models ----------------
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    company: Optional[str] = None
    email: str
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    full_name: str
    company: Optional[str] = None
    email: str
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str


class ChatRequest(BaseModel):
    session_id: str
    message: str


# ---------------- Chatbot ----------------
SYSTEM_PROMPT = """You are ZJ Assistant, the official AI concierge for ZJ Infosystem — an enterprise IT solutions company founded in 2021 by Mr. Dadasaheb Shaikh, headquartered in Hadapsar, Pune, Maharashtra, India.

You answer questions ONLY about ZJ Infosystem. If asked anything unrelated, politely steer the conversation back to how ZJ Infosystem can help the visitor.

Company tagline: "Transforming Technology. Empowering Businesses."

Services offered:
- IT Infrastructure Development
- Software Development
- IT Auditing
- Microsoft Infrastructure Services (Azure, Windows Server, Microsoft 365)
- Network Design & Wireless Solutions
- Security & Networking (Cybersecurity)
- Building Management Services
- Data Centre Management
- Managed IT Services
- HR Consultancy
- Accounting & Auditing
- Financial Consultancy
- Data Processing & Management

Industries served: Education, Healthcare, Manufacturing, Finance, Government, Retail, Hospitality, Professional Services, SMEs and Large Enterprises.

Technology stack expertise: Microsoft, Azure, Windows Server, Microsoft 365, VMware, Cisco, Linux, Docker, Cloud Infrastructure, Networking, Cybersecurity.

Contact: Visit the Contact page on this website, or email {email}. Office at PMC Garden Road, Satar Nagar, Hadapsar, Pune, Maharashtra, India.

Voice: Professional, confident, concise, corporate-trustworthy. Keep answers under 120 words. When appropriate, invite the visitor to book a consultation via the Contact page.""".format(email=COMPANY_EMAIL)


@api_router.get("/")
async def root():
    return {"service": "ZJ Infosystem API", "status": "ok"}


@api_router.post("/contact")
async def submit_contact(payload: ContactCreate):
    submission = ContactSubmission(**payload.model_dump())
    doc = submission.model_dump()
    await db.contact_submissions.insert_one(doc)

    logger.info(
        f"New contact submission: {submission.email} — {submission.service or 'general'}"
    )

    # Send emails
    try:
        send_company_email(submission.model_dump())
    except Exception as e:
        logger.error(f"Company email failed: {e}")

    try:
        send_customer_email(submission.model_dump())
    except Exception as e:
        logger.error(f"Customer email failed: {e}")

    return {
        "success": True,
        "id": submission.id,
        "message": "Thank you. Our team will contact you within one business day."
    }


@api_router.get("/contact/list")
async def list_contacts():
    docs = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return docs


@api_router.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=req.session_id,
        system_message=SYSTEM_PROMPT,
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")

    # persist user message
    await db.chat_messages.insert_one({
        "id": str(uuid.uuid4()),
        "session_id": req.session_id,
        "role": "user",
        "content": req.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    async def event_generator():
        assistant_text = ""
        try:
            async for event in chat.stream_message(UserMessage(text=req.message)):
                if isinstance(event, TextDelta):
                    assistant_text += event.content
                    yield f"data: {event.content}\n\n"
                elif isinstance(event, StreamDone):
                    break
        except Exception as e:
            logger.error(f"LLM stream error: {e}")
            yield f"data: [error] {str(e)}\n\n"
        finally:
            if assistant_text:
                await db.chat_messages.insert_one({
                    "id": str(uuid.uuid4()),
                    "session_id": req.session_id,
                    "role": "assistant",
                    "content": assistant_text,
                    "created_at": datetime.now(timezone.utc).isoformat(),
                })
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no", "Connection": "keep-alive"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
