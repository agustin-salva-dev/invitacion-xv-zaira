interface SinglePhotoGalleryProps {
  readonly photoSrc: string;
  readonly photoAlt: string;
}

export function SinglePhotoGallery({
  photoSrc,
  photoAlt,
}: SinglePhotoGalleryProps) {
  return (
    <section className="galeria degradez-opcional-var">
      <div className="container">
        <div className="single-photo-wrapper">
          <figure className="polaroid">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              alt={photoAlt}
              className="polaroid-img"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

