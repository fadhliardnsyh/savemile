/** Referensi bersama ke instance Lenis, agar komponen lain bisa memicu
 *  scroll terprogram (mis. pagination) tanpa bentrok dengan tipe global. */
export type LenisLike = {
  scrollTo: (
    target: HTMLElement | number | string,
    options?: { offset?: number }
  ) => void;
};

export const lenisRef: { current: LenisLike | null } = { current: null };
