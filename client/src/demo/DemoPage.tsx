import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { demoSteps } from "./demoSteps";
import "./DemoPage.css";

export default function DemoPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= demoSteps.length - 1) return;

    const timer = setTimeout(() => {
      setStep((current) => current + 1);
    }, 3500);

    return () => clearTimeout(timer);
  }, [step]);

  const currentStep = demoSteps[step];
  const progress = ((step + 1) / demoSteps.length) * 100;

  return (
    <div className="demo-page">

      <div className="demo-header">
        <div>
          <h2>☁️ CloudVault</h2>
          <span>AI Guided Demo</span>
        </div>

        <button
          className="exit-demo"
          onClick={() => navigate("/")}
        >
          ✕ Exit Demo
        </button>
      </div>

      <div className="demo-container">

        <div className="ai-guide">
          <div className="ai-icon">✨</div>

          <div>
            <span className="ai-label">CLOUDVAULT AI</span>

            <h1>{currentStep.title}</h1>

            <p>{currentStep.message}</p>
          </div>
        </div>

        <div className="demo-visual">

          {currentStep.action === "welcome" && (
            <div className="demo-animation">
              <div className="big-icon">☁️</div>
              <h2>Your intelligent cloud storage</h2>
              <p>
                Store, manage and understand your documents with AI.
              </p>
            </div>
          )}

          {currentStep.action === "upload" && (
            <div className="demo-animation">
              <div className="big-icon">⬆️</div>
              <h2>Uploading Annual_Report.pdf</h2>

              <div className="upload-bar">
                <div className="upload-progress"></div>
              </div>

              <p>Securely uploading your document...</p>
            </div>
          )}

          {currentStep.action === "files" && (
            <div className="demo-animation">
              <div className="file-demo-card">
                📄
                <div>
                  <strong>Annual_Report.pdf</strong>
                  <p>PDF Document • Ready</p>
                </div>
              </div>

              <p>Your uploaded files are available instantly.</p>
            </div>
          )}

          {currentStep.action === "summarize" && (
            <div className="demo-animation">
              <div className="big-icon">✨</div>
              <h2>AI is reading the document...</h2>
              <p>
                CloudVault uses RAG to understand your document and
                generate a useful summary.
              </p>
            </div>
          )}

          {currentStep.action === "ask" && (
            <div className="demo-animation">
              <div className="demo-question">
                What are the key points in this document?
              </div>

              <div className="demo-answer">
                🤖 CloudVault AI is retrieving relevant information...
              </div>
            </div>
          )}

          {currentStep.action === "delete" && (
            <div className="demo-animation">
              <div className="big-icon">🗑️</div>
              <h2>File Deleted</h2>
              <p>
                Files can be securely removed whenever you no longer
                need them.
              </p>
            </div>
          )}

        </div>

        <div className="demo-bottom">
          <div className="demo-progress-info">
            <span>
              Demo {step + 1} of {demoSteps.length}
            </span>

            <span>{Math.round(progress)}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="auto-message">
            {step < demoSteps.length - 1
              ? "✨ AI Demo running automatically..."
              : "✓ Demo complete"}
          </p>

          {step === demoSteps.length - 1 && (
            <button
              className="start-cloudvault"
              onClick={() => navigate("/register")}
            >
              Get Started with CloudVault →
            </button>
          )}
        </div>

      </div>
    </div>
  );
}