/**
 * service functions for use in client-side code (browser)
 */
'use client'

export const cmsFetcher = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IMPLAN_CMS}${url}`);
  return res.json();
}