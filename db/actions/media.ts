"use server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/db";
import { websiteMediaVersions } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";

const PUBLIC_PATHS=["/","/services","/services/geological-surveys","/services/borehole-drilling","/services/air-lifting-developing","/services/pumping-tests","/services/water-quality-analysis","/services/pump-installation","/services/borehole-rehabilitation","/services/hydro-fracturing"];

export async function saveMediaVersion(input:{slotKey:string;mediaType:"image"|"video";secureUrl:string;publicId:string;altText?:string;width?:number;height?:number;duration?:number;}){
  const db = getDb();
  await requireAdmin();
  await db.update(websiteMediaVersions).set({isCurrent:false}).where(and(eq(websiteMediaVersions.slotKey,input.slotKey),eq(websiteMediaVersions.isCurrent,true)));
  const [version]=await db.insert(websiteMediaVersions).values({...input,isCurrent:true}).returning();
  PUBLIC_PATHS.forEach((path)=>revalidatePath(path));
  revalidatePath("/admin/media");
  return version;
}

export async function restoreMediaVersion(versionId:string){
  const db = getDb();
  await requireAdmin();
  const [version]=await db.select().from(websiteMediaVersions).where(eq(websiteMediaVersions.id,versionId)).limit(1);
  if(!version) throw new Error("Media version not found");
  await db.update(websiteMediaVersions).set({isCurrent:false}).where(and(eq(websiteMediaVersions.slotKey,version.slotKey),eq(websiteMediaVersions.isCurrent,true)));
  await db.update(websiteMediaVersions).set({isCurrent:true}).where(eq(websiteMediaVersions.id,versionId));
  PUBLIC_PATHS.forEach((path)=>revalidatePath(path));
  revalidatePath("/admin/media");
}
