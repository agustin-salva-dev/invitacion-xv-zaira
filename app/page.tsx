"use client";

import { useState, useCallback } from "react";
import { invitationData } from "@/app/config/invitationData";
import type { ModalId } from "@/app/types/invitation";

import { HeartPreloader } from "@/app/components/loader/HeartPreloader";
import { MusicEntranceModal } from "@/app/components/music/MusicEntranceModal";
import { FloatingMusicPlayer } from "@/app/components/music/FloatingMusicPlayer";
import { CoverHero } from "@/app/components/hero/CoverHero";
import { CountdownSection } from "@/app/components/countdown/CountdownSection";
import { EventDetailsSection } from "@/app/components/event/EventDetailsSection";
import { RsvpActionSection } from "@/app/components/rsvp/RsvpActionSection";
import { SinglePhotoGallery } from "@/app/components/gallery/SinglePhotoGallery";
import { PartyDetailsSection } from "@/app/components/party/PartyDetailsSection";
import { GiftsSection } from "@/app/components/gifts/GiftsSection";
import { InvitationFooter } from "@/app/components/footer/InvitationFooter";

import { RsvpModal } from "@/app/components/modals/RsvpModal";
import { MapModal } from "@/app/components/modals/MapModal";
import { SongSuggestionModal } from "@/app/components/modals/SongSuggestionModal";
import { DressCodeModal } from "@/app/components/modals/DressCodeModal";
import { TipsModal } from "@/app/components/modals/TipsModal";
import { GiftsModal } from "@/app/components/modals/GiftsModal";

import { useMusicPlayer } from "@/app/hooks/useMusicPlayer";
import { useModal } from "@/app/hooks/useModal";

export default function InvitationPage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [musicModalDismissed, setMusicModalDismissed] = useState(false);

  const musicPlayer = useMusicPlayer("/assets/audio/i-love-it.mp3");
  const { openModal, closeModal, isOpen } = useModal();

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  const handleMusicModalEnter = useCallback(() => {
    setMusicModalDismissed(true);
  }, []);

  const handleOpenModal = useCallback(
    (id: ModalId) => {
      openModal(id);
    },
    [openModal],
  );

  const showContent = preloaderDone && musicModalDismissed;

  return (
    <>
      {/* 1. Preloader con animación del corazón */}
      {!preloaderDone && (
        <HeartPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* 2. Modal de entrada con música */}
      {preloaderDone && !musicModalDismissed && (
        <MusicEntranceModal
          honoree={invitationData.honoree}
          subtitle={invitationData.subtitle}
          welcomeMessage={invitationData.welcomeMessage}
          musicPlayer={musicPlayer}
          onEnter={handleMusicModalEnter}
        />
      )}

      {/* 3. Contenido principal de la invitación */}
      {showContent && (
        <div className="inv-container">
          {/* Reproductor flotante */}
          <FloatingMusicPlayer musicPlayer={musicPlayer} />

          {/* Portada estilo Fairytale (Árbol, farol, mascotas en el río, corona) */}
          <CoverHero
            honoree={invitationData.honoree}
            displayDate={invitationData.displayDate}
          />

          {/* Cuenta regresiva */}
          <CountdownSection eventDate={invitationData.eventDate} />

          {/* Detalles del evento */}
          <EventDetailsSection
            event={invitationData.event}
            honoree={invitationData.honoree}
            onOpenModal={handleOpenModal}
          />

          {/* Confirmación de asistencia */}
          <RsvpActionSection onOpenModal={handleOpenModal} />

          {/* Galería – foto única */}
          <SinglePhotoGallery
            photoSrc="/assets/images/zairaImg.jpeg"
            photoAlt={invitationData.galleryPhotoAlt}
          />

          {/* Fiesta: Música, Dress Code, Tips */}
          <PartyDetailsSection onOpenModal={handleOpenModal} />

          {/* Regalos */}
          <GiftsSection onOpenModal={handleOpenModal} />

          {/* Footer */}
          <InvitationFooter
            honoree={invitationData.honoree}
            subtitle={invitationData.subtitle}
            onOpenModal={handleOpenModal}
          />

          {/* Modales de fachada */}
          <RsvpModal isOpen={isOpen("rsvp")} honoree={invitationData.honoree} onClose={closeModal} />
          <MapModal
            isOpen={isOpen("map")}
            onClose={closeModal}
            venue={invitationData.event.venue}
            address={invitationData.event.address}
            mapsUrl={invitationData.event.mapsUrl}
            mapsEmbedUrl={invitationData.event.mapsEmbedUrl}
          />
          <SongSuggestionModal isOpen={isOpen("song")} onClose={closeModal} />
          <DressCodeModal isOpen={isOpen("dressCode")} onClose={closeModal} />
          <TipsModal isOpen={isOpen("tips")} onClose={closeModal} />
          <GiftsModal isOpen={isOpen("gifts")} onClose={closeModal} />
        </div>
      )}
    </>
  );
}
