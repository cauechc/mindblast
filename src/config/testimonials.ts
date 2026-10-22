/**
 * DEPOIMENTOS. Somente depoimentos reais, com autorização do cliente.
 * Enquanto a lista estiver vazia, o site mostra espaços reservados.
 */
export type Testimonial = { name: string; business: string; city: string; text: string; photo?: string };

export const testimonials: Testimonial[] = [];

/** Quantos espaços reservados mostrar quando não há depoimentos. */
export const testimonialSlots = 3;
