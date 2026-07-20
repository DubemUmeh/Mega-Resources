import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EASE_OUT = "power3.out";
export const EASE_INOUT = "power2.inOut";
export const CINEMATIC = "power4.out";

export { gsap, ScrollTrigger };
