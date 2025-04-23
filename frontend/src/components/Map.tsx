import { useEffect, useRef } from 'react';

interface MapProps {
  lat: number;
  lng: number;
  apiKey: string;
}

export default function Map({ lat, lng, apiKey }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const { Loader } = await import('@googlemaps/js-api-loader');

      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['marker'],
      });

      const { Map } = await loader.importLibrary('maps');
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');

      if (mapRef.current) {
        const position = { lat, lng };
        const map = new Map(mapRef.current, {
          center: position,
          zoom: 15,
        });

        new AdvancedMarkerElement({
          map,
          position,
          title: 'Item Location',
        });
      }
    };

    initMap();
  }, [lat, lng, apiKey]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '300px', borderRadius: '10px', overflow: 'hidden' }}
    />
  );
}
