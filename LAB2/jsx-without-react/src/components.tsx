/** @jsx createElement */
import { createElement, ComponentProps } from "./jsx-runtime";

// CARD COMPONENT
interface CardProps extends ComponentProps {
  title?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const Card = ({ title, children, className = "", onClick }: CardProps) => {
  return (
    <div
      className={`card ${className}`}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
      onClick={onClick}
    >
      {title && <h3 style={{ marginTop: "0" }}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

// MODAL COMPONENT
interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
          maxWidth: "90%",
          position: "relative",
        }}
      >
        {title && <h3 style={{ marginTop: "0" }}>{title}</h3>}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

// FORM COMPONENT
interface FormProps extends ComponentProps {
  onSubmit: (e: Event) => void;
  className?: string;
}

const Form = ({ onSubmit, children, className = "" }: FormProps) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

// INPUT COMPONENT
interface InputProps extends ComponentProps {
  type?: string;
  value: string;
  onChange: (e: Event) => void;
  placeholder?: string;
  className?: string;
}

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
}: InputProps) => {
  const handleInput = (e: Event) => {
    onChange(e);
  };

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={className}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
      onInput={handleInput}
    />
  );
};

export { Card, Modal, Form, Input };
