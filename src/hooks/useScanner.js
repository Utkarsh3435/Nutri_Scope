import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useRef } from "react";

export const useScanner = (onResult) => {
  const scannerRef = useRef(null);
  const stableCount = useRef(0);
  const lastCode = useRef(null);
  const isRunning = useRef(false);

  const start = async () => {
    if (isRunning.current) return; // prevent re-start flicker

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("barcode-reader");
    }

    const cams = await Html5Qrcode.getCameras();
    if (!cams.length) return;

    isRunning.current = true;

    await scannerRef.current.start(
      cams[cams.length - 1].id,
      {
        fps: 10,
        qrbox: { width: 260, height: 160 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.UPC_A
        ]
      },
      async (code) => {
        if (code === lastCode.current) {
          stableCount.current++;
        } else {
          lastCode.current = code;
          stableCount.current = 1;
        }

        if (stableCount.current >= 2) {
          stableCount.current = 0;

          await stop(); // clean stop
          onResult(code);
        }
      }
    );
  };

  const stop = async () => {
    if (!scannerRef.current || !isRunning.current) return;

    try {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
    } catch {}

    isRunning.current = false;
  };

  return { start, stop };
};