'use client'

import { Facebook, Instagram, Link, LinkedIn, WhatsApp, X } from "@mui/icons-material";
import { IconButton, Stack, Link as MuiLink, Snackbar } from "@mui/material";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";



export const ShareOptions = () => {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_HOST}${pathname}`;
  const [copied, setCopied] = useState(false);

  const handleLinkCopy = useCallback(async () => {
    setCopied(true)
    copyTextToClipboard(url)
  }, [])

  useEffect(() => {
    if (!copied) return;

    const timeOutId = setTimeout(() => {
      setCopied(false)
    }, 800)

    return () => clearTimeout(timeOutId)
  }, [copied])

  return (
    <>
      <Stack direction={'row'}>
        <IconButton
          aria-label="Copiar al portapapeles"
          size="large" onClick={handleLinkCopy}>
          <Link />
        </IconButton>
        <IconButton
          LinkComponent={MuiLink}
          target='_blank'
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          size="large"
          aria-label="Compartir en LinkedIn"
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          size="large"
          aria-label="Compartir en Facebook"
          LinkComponent={MuiLink}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target='_blank'
        >
          <Facebook />
        </IconButton>
        <IconButton
          size="large"
          aria-label="Enviar por WhatsApp"
          LinkComponent={MuiLink}
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`}
          target='_blank'
        >
          <WhatsApp />
        </IconButton>
      </Stack>
      <Snackbar
        open={copied}
        message="Enlace copiado al portapapeles"
      />
    </>
  );
}



export const copyTextToClipboard = async (text: string) => {
  return navigator.clipboard.writeText(text);
}