"use client";

import { useState, useCallback } from "react";
import type { ModalId } from "@/app/types/invitation";

export interface UseModalReturn {
  readonly activeModal: ModalId | null;
  readonly openModal: (id: ModalId) => void;
  readonly closeModal: () => void;
  readonly isOpen: (id: ModalId) => boolean;
}

export function useModal(): UseModalReturn {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const openModal = useCallback((id: ModalId) => {
    setActiveModal(id);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    document.body.style.overflow = "";
  }, []);

  const isOpen = useCallback(
    (id: ModalId) => activeModal === id,
    [activeModal]
  );

  return { activeModal, openModal, closeModal, isOpen };
}

