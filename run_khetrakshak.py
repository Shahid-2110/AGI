import subprocess
import time
import sys
import os

# Ensure UTF-8 output on Windows terminals
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

def start_services():
    print("=" * 65)
    print("  [🌾] Launching KhetRakshak (Field Guardian) Full Stack App [🌾]  ")
    print("=" * 65)

    backend_cmd = [sys.executable, "-m", "uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
    frontend_cmd = ["npm", "run", "dev"]

    print("\n[1/2] Starting FastAPI Backend on http://localhost:8000 ...")
    backend_proc = subprocess.Popen(backend_cmd, cwd=os.path.dirname(os.path.abspath(__file__)))
    
    time.sleep(2)

    print("\n[2/2] Starting React + Vite PWA on http://localhost:5173 ...")
    frontend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend")
    frontend_proc = subprocess.Popen(frontend_cmd, cwd=frontend_dir, shell=True)

    print("\n" + "=" * 65)
    print("[*] KhetRakshak is LIVE!")
    print("[*] Frontend PWA : http://localhost:5173")
    print("[*] API Docs (Swagger): http://localhost:8000/docs")
    print("=" * 65)
    print("Press Ctrl+C to terminate services.\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping services...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Done.")

if __name__ == "__main__":
    start_services()
