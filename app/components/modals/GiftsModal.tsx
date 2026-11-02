"use client";

import { useState, useCallback } from "react";
import { Copy, Check, User, Tag, CreditCard, Mail, MapPin } from "lucide-react";
import { FacadeModalWrapper } from "./FacadeModalWrapper";

interface GiftsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const BANK_DATA = {
  holder: "Zaira Evangelina Alanis",
  alias: "a.zaira25",
  cbu: "0000003100084863047688",
} as const;

export function GiftsModal({ isOpen, onClose }: GiftsModalProps) {
  const [copiedField, setCopiedField] = useState<"cbu" | "alias" | null>(null);

  const handleCopy = useCallback(
    async (text: string, field: "cbu" | "alias") => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      } catch {
        // Manejo silencioso en caso de bloqueo de permisos de portapapeles
      }
    },
    [],
  );

  return (
    <FacadeModalWrapper
      id="gifts"
      isOpen={isOpen}
      onClose={onClose}
      title="Regalos"
      iconSrc="/assets/svg/img_circuloRegalo.svg"
    >
      <div className="modal-info-content">
        <p className="modal-info-text">
          Mi mejor regalo es tu presencia, pero si deseás hacerme un presente
          podés hacerlo a través de:
        </p>

        {/* Subsección 2: Transferencia */}
        <div className="modal-gift-section">
          <h6>Transferencia</h6>

          <div className="bank-cards-container">
            {/* Tarjeta: Titular */}
            <div className="bank-item-card">
              <div className="bank-item-left">
                <div className="bank-icon-circle" aria-hidden="true">
                  <User size={18} className="bank-icon" />
                </div>
                <div className="bank-item-info">
                  <span className="bank-item-title">Titular</span>
                  <span className="bank-item-value">{BANK_DATA.holder}</span>
                </div>
              </div>
            </div>

            {/* Tarjeta: Alias */}
            <div className="bank-item-card">
              <div className="bank-item-left">
                <div className="bank-icon-circle" aria-hidden="true">
                  <Tag size={18} className="bank-icon" />
                </div>
                <div className="bank-item-info">
                  <span className="bank-item-title">Alias</span>
                  <span className="bank-item-value bank-item-mono">
                    {BANK_DATA.alias}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className={`bank-copy-badge${copiedField === "alias" ? " is-copied" : ""}`}
                onClick={() => handleCopy(BANK_DATA.alias, "alias")}
                title="Copiar Alias"
                aria-label="Copiar Alias"
              >
                {copiedField === "alias" ? (
                  <>
                    <Check size={14} className="copy-badge-icon check-icon" />
                    <span className="copy-badge-text">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="copy-badge-icon" />
                    <span className="copy-badge-text">Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Tarjeta: CBU */}
            <div className="bank-item-card bank-item-card-cbu">
              <div className="bank-item-left">
                <div className="bank-icon-circle" aria-hidden="true">
                  <CreditCard size={18} className="bank-icon" />
                </div>
                <div className="bank-item-info">
                  <span className="bank-item-title">CBU</span>
                  <span className="bank-item-value bank-item-mono bank-item-cbu">
                    {BANK_DATA.cbu}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className={`bank-copy-badge${copiedField === "cbu" ? " is-copied" : ""}`}
                onClick={() => handleCopy(BANK_DATA.cbu, "cbu")}
                title="Copiar CBU"
                aria-label="Copiar CBU"
              >
                {copiedField === "cbu" ? (
                  <>
                    <Check size={14} className="copy-badge-icon check-icon" />
                    <span className="copy-badge-text">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="copy-badge-icon" />
                    <span className="copy-badge-text">Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="facade-modal-footer">
        <button type="button" className="boton" onClick={onClose}>
          ¡Muchas gracias!
        </button>
      </div>
    </FacadeModalWrapper>
  );
}
