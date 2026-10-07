import { desc, eq, and } from "drizzle-orm";
import { db } from "@/db/db";
import { websiteMediaVersions } from "@/db/schema";

export type MediaType = "image" | "video";
export type MediaSlot = { key:string; page:string; section:string; label:string; description:string; defaultUrl:string; defaultAlt:string };
export type ResolvedMedia = { url:string; publicId?:string; mediaType:MediaType; altText:string; isDefault:boolean; versionId?:string };

export const MEDIA_SLOTS: MediaSlot[] = [
  {key:"homepage.hero",page:"Homepage",section:"Hero",label:"Homepage Hero",description:"Main visual displayed behind the homepage hero content.",defaultUrl:"/images/home/hero-2.png",defaultAlt:"Drilling rig on site in Ghana"},
  {key:"services.geological-surveys.hero",page:"Services",section:"Geological Surveys",label:"Geological Surveys Hero",description:"Main visual on the Geological Surveys service page.",defaultUrl:"/images/home/geological-surveys.png",defaultAlt:"Geological surveys"},
  {key:"services.borehole-drilling.hero",page:"Services",section:"Borehole Drilling",label:"Borehole Drilling Hero",description:"Main visual on the Borehole Drilling service page.",defaultUrl:"/images/home/borehole-drilling.jpeg",defaultAlt:"Borehole drilling"},
  {key:"services.air-lifting-developing.hero",page:"Services",section:"Air Lifting / Developing",label:"Air Lifting / Developing Hero",description:"Main visual on the Air Lifting / Developing service page.",defaultUrl:"/images/home/air-lifting.png",defaultAlt:"Borehole air lifting and development"},
  {key:"services.pumping-tests.hero",page:"Services",section:"Pumping Tests",label:"Pumping Tests Hero",description:"Main visual on the Pumping Tests service page.",defaultUrl:"/images/home/pumping-tests.png",defaultAlt:"Borehole pumping test"},
  {key:"services.water-quality-analysis.hero",page:"Services",section:"Water Quality Analysis",label:"Water Quality Analysis Hero",description:"Main visual on the Water Quality Analysis service page.",defaultUrl:"/images/home/water-quality-analysis.svg",defaultAlt:"Water quality analysis"},
  {key:"services.pump-installation.hero",page:"Services",section:"Pump Installation",label:"Pump Installation Hero",description:"Main visual on the Pump Installation service page.",defaultUrl:"/images/home/pump-installation.png",defaultAlt:"Borehole pump installation"},
  {key:"services.borehole-rehabilitation.hero",page:"Services",section:"Borehole Rehabilitation",label:"Borehole Rehabilitation Hero",description:"Main visual on the Borehole Rehabilitation service page.",defaultUrl:"/images/home/borehole-rehabilitation.png",defaultAlt:"Borehole rehabilitation"},
  {key:"services.hydro-fracturing.hero",page:"Services",section:"Hydro-fracturing",label:"Hydro-fracturing Hero",description:"Main visual on the Hydro-fracturing service page.",defaultUrl:"/images/home/hydro-fracturing.png",defaultAlt:"Hydro-fracturing"},
];

export async function getResolvedMedia(slotKey:string):Promise<ResolvedMedia>{
  const slot=MEDIA_SLOTS.find((item)=>item.key===slotKey);
  if(!slot) throw new Error("Unknown media slot: "+slotKey);
  const [current]=await db.select().from(websiteMediaVersions).where(and(eq(websiteMediaVersions.slotKey,slotKey),eq(websiteMediaVersions.isCurrent,true))).limit(1);
  if(!current) return {url:slot.defaultUrl,mediaType:"image",altText:slot.defaultAlt,isDefault:true};
  return {url:current.secureUrl,publicId:current.publicId,mediaType:current.mediaType,altText:current.altText||slot.defaultAlt,isDefault:false,versionId:current.id};
}

export async function getAdminMediaSlots(){
  const versions=await db.select().from(websiteMediaVersions).orderBy(desc(websiteMediaVersions.createdAt));
  return MEDIA_SLOTS.map((slot)=>({...slot,current:versions.find((v)=>v.slotKey===slot.key&&v.isCurrent)??null,history:versions.filter((v)=>v.slotKey===slot.key)}));
}
