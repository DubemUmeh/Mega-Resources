Here’s a prompt you can give another coding agent. It’s deliberately explicit about **not refactoring your existing service architecture** and about treating this as an SEO/content-architecture change rather than simply adding four pages.

 You are working directly in the public GitHub repository:

 `https://github.com/DubemUmeh/Mega-Resources`

 Your task is to pull the latest `main` branch, inspect the existing codebase thoroughly, implement the changes below, run the appropriate checks, push a feature branch, and open a PR against `main`.

 ## Primary objective

 Mega Resources currently presents its services primarily around borehole drilling, but the company also provides four additional specialized services:

 1. Piezometer Drilling
2. Observation Wells
3. Dewatering Wells
4. Horizontal Drain Drilling

 These should become first-class service pages with their own URLs, SEO metadata, content, and internal linking.

 However, do **not** treat this as merely "add four pages." The existence of these services changes how Mega Resources should be represented throughout the website. Review the existing company/service messaging and update it where appropriate so the company is positioned as a broader groundwater, drilling, monitoring, and dewatering specialist rather than exclusively a borehole-drilling company.

---

 ## IMPORTANT: preserve the existing architecture

 The homepage currently has this intentionally separate presentation-oriented array in:

 `components/home/services.tsx`

 It looks approximately like:

```
const services = [
  {
    num: "01",
    title: "Geological\nSurveys",
    desc: "We confirm water depth and volume on your land before we drill.",
    img: "/images/home/geological-surveys.png",
  },
  {
    num: "02",
    title: "Borehole\nDrilling",
    desc: "100ft–350ft+ depth. Geophysical survey, drilling, and PVC casing to prevent collapse.",
    img: "/images/home/borehole-drilling.jpeg",
  },
  {
    num: "03",
    title: "Air Lifting /\nDeveloping",
    desc: "Clear drilling debris and develop the borehole for maximum flow.",
    img: "/images/home/air-lifting.png",
  },
  {
    num: "04",
    title: "Pumping\nTests",
    desc: "Measure sustainable yield so your pump is sized correctly.",
    img: "/images/home/pumping-tests.png",
  },
  {
    num: "05",
    title: "Water Quality Analysis",
    desc: "Analyse water quality to guide safe use, treatment, and system decisions.",
    img: "/images/home/water-quality-analysis.svg",
  },
  {
    num: "06",
    title: "Pump\nInstallation",
    desc: "Submersible, solar, and surface pumps — fully installed and wired.",
    img: "/images/home/pump-installation.png",
  },
  {
    num: "07",
    title: "Borehole\nRehabilitation",
    desc: "Low yield or muddy water? We clean and re-develop old boreholes.",
    img: "/images/home/borehole-rehabilitation.png",
  },
  {
    num: "08",
    title: "Hydro-\nfracturing",
    desc: "Fracture low-yield rock formations to unlock higher water flow.",
    img: "/images/home/hydro-fracturing.png",
  },
];
```

 This separation is intentional.

 **Do not refactor this into a single source of truth.**

 Do not unnecessarily change the existing homepage service array simply to make the new routes easier to manage.

 The route/page/SEO layer can have its own service definitions.

---

 # Step 1 — Inspect before changing anything

 Before writing code, inspect the repository thoroughly.

 Pay particular attention to:

 - `app/services/[slug]`
- all files underneath `app/services`
- SEO utilities/configuration
- `lib/seo`
- `app/resources`
- resource metadata/content structures
- sitemap generation
- robots configuration
- structured data/schema
- metadata generation
- canonical URL handling
- OpenGraph/Twitter metadata
- internal-linking patterns
- existing service page components
- service-related components
- navigation/footer
- homepage service section
- existing company/about copy
- contact/CTA copy
- any content that currently describes Mega Resources solely or primarily as a borehole-drilling company

 Understand and follow the conventions already present in the repository.

 Do not introduce a new SEO architecture if an existing one already handles this.

 Do not create a parallel content system unnecessarily.

---

 # Step 2 — Existing service routes

 The existing service slugs are:

```
[
  "geological-surveys",
  "borehole-drilling",
  "air-lifting-developing",
  "pumping-tests",
  "water-quality-analysis",
  "pump-installation",
  "borehole-rehabilitation",
  "hydro-fracturing",
]
```

 They are rendered through:

 `app/services/[slug]`

 Preserve the existing behavior and URLs.

 Do not break or rename any existing service URLs.

---

 # Step 3 — Add four new first-class service pages

 Create:

```
/services/piezometer-drilling
/services/observation-wells
/services/dewatering-wells
/services/horizontal-drain-drilling
```

 Use the existing `app/services/[slug]` implementation/pattern wherever possible.

 Do not create four completely independent page implementations if the existing dynamic route architecture already supports them.

 The new pages must feel native to the existing site.

---

 # Step 4 — Write genuinely useful service content

 Do not make thin SEO landing pages.

 Each service needs substantive, useful content explaining what the service is, when it is needed, what Mega Resources does, and how it relates to the broader groundwater/drilling work.

 The content should be technically credible without inventing unsupported company claims.

 ## Piezometer Drilling

 Explain, where appropriate:

 - what a piezometer is
- why piezometers are installed
- groundwater-level monitoring
- monitoring groundwater pressure/head
- construction/project monitoring
- how installation and drilling work
- relationship to hydrogeological investigations
- relationship to observation wells
- situations where clients may need piezometers

 Potential search intent includes:

 - piezometer drilling
- piezometer installation
- groundwater monitoring
- groundwater level monitoring
- piezometer drilling Ghana

 Do not keyword-stuff.

 ## Observation Wells

 Explain:

 - what an observation well is
- groundwater monitoring
- monitoring water levels over time
- groundwater investigations
- construction/dewatering monitoring
- difference between an observation well and a production borehole where relevant
- installation considerations

 Potential search intent includes:

 - observation well drilling
- groundwater observation wells
- groundwater monitoring wells
- observation well drilling Ghana

 ## Dewatering Wells

 Explain:

 - why groundwater must sometimes be removed from a construction/excavation area
- dewatering wells
- groundwater control
- lowering groundwater levels
- construction and excavation applications
- relationship with pumping tests and hydrogeological assessment
- pump/system considerations

 Potential search intent includes:

 - dewatering wells
- groundwater dewatering
- dewatering boreholes
- construction dewatering
- dewatering wells Ghana

 Avoid making specific performance guarantees.

 ## Horizontal Drain Drilling

 Explain:

 - what horizontal drain drilling is
- groundwater/drainage applications
- relief/drainage of groundwater
- slopes, excavations, retaining structures, or other appropriate applications
- how horizontal drains differ from conventional vertical boreholes
- when the technique is useful

 Potential search intent includes:

 - horizontal drain drilling
- horizontal drainage drilling
- groundwater drainage
- horizontal drains Ghana

 Do not invent project examples or client names.

---

 # Step 5 — Reposition the company appropriately

 This is an important part of the task.

 The new services mean the website should not communicate that Mega Resources only drills water-supply boreholes.

 Review the entire codebase for language such as:

 - "we are a borehole drilling company"
- "our borehole drilling company"
- descriptions that imply borehole drilling is the company's only service
- metadata that limits the company identity to boreholes
- About/company descriptions that are now too narrow
- homepage SEO text that is too narrow
- Organization/company structured data descriptions if applicable
- resource content that unnecessarily describes the company only as a borehole provider

 Update such copy **where it is genuinely appropriate**.

 The broader positioning should naturally communicate expertise across areas such as:

 - groundwater investigation
- geological/hydrogeological surveys
- borehole drilling
- groundwater monitoring
- piezometers
- observation wells
- pumping tests
- water quality
- groundwater/dewatering systems
- specialized drilling
- pump installation
- borehole rehabilitation
- hydro-fracturing
- horizontal drainage

 Do not turn every sentence into a keyword list.

 The site should still have a clear hierarchy:

 **Groundwater expertise → investigation → drilling → monitoring → testing → water supply → dewatering/specialized applications**

 The existing borehole services remain important; they should not be diminished.

---

 # Step 6 — SEO implementation

 Follow the repository's existing SEO architecture.

 Do not invent a new SEO framework.

 The four new pages need:

 - unique page titles
- unique meta descriptions
- canonical URLs
- appropriate OpenGraph metadata if the existing architecture supports it
- appropriate Twitter metadata if the existing architecture supports it
- appropriate structured data if the existing service pages use it
- correct sitemap entries
- appropriate indexing behavior
- internal links

 Use the existing SEO helpers/configuration.

 Inspect `@app/resources` carefully because the repository already appears to use resources/content as part of its SEO strategy.

 Make sure the new services fit naturally into that strategy.

---

 # Step 7 — Sitemap

 The current sitemap service entries look conceptually like:

```
export const serviceSlugs = [
  "geological-surveys",
  "borehole-drilling",
  "air-lifting-developing",
  "pumping-tests",
  "water-quality-analysis",
  "pump-installation",
  "borehole-rehabilitation",
  "hydro-fracturing",
] as const;
```

 Add:

```
"piezometer-drilling",
"observation-wells",
"dewatering-wells",
"horizontal-drain-drilling",
```

 Preserve the existing sitemap conventions.

 Do not change existing URLs.

 If there is another canonical service configuration in the repo, follow the existing architecture rather than duplicating logic unnecessarily.

---

 # Step 8 — Related services/internal linking

 The four new services should not be isolated.

 Implement related-service/internal-linking relationships using the existing UI patterns.

 For example:

 ### Piezometer Drilling

 Related:

 - Geological Surveys
- Observation Wells
- Pumping Tests
- Borehole Drilling

 ### Observation Wells

 Related:

 - Piezometer Drilling
- Geological Surveys
- Pumping Tests
- Dewatering Wells

 ### Dewatering Wells

 Related:

 - Borehole Drilling
- Pumping Tests
- Geological Surveys
- Horizontal Drain Drilling

 ### Horizontal Drain Drilling

 Related:

 - Dewatering Wells
- Geological Surveys
- Borehole Drilling

 Use judgment based on the actual existing component architecture.

 Also consider links from existing service pages to these new services where the relationship is natural.

 Do not create excessive reciprocal links just for SEO.

---

 # Step 9 — Homepage

 Review:

 `components/home/services.tsx`

 Do not refactor its existing architecture.

 Determine whether the homepage should visibly include the four additional services based on the existing design.

 If the current design intentionally shows exactly eight services and expanding it would harm the UI, leave that presentation structure intact.

 However, make sure the new services are discoverable elsewhere through:

 - service navigation
- service index/listing if one exists
- related services
- relevant homepage copy
- CTA/resource links where appropriate

 If there is an existing service listing page designed to contain all services, add the four there.

 Do not force them into the homepage's eight-card design merely for completeness.

---

 # Step 10 — Resources

 Inspect `app/resources` thoroughly.

 Understand how resources are currently used for:

 - SEO
- topical authority
- internal linking
- service discovery
- location/search intent
- related content

 Do not manufacture a large amount of unnecessary resource content.

 But where the existing architecture supports it, connect relevant resource pages/topics to the new services.

 For example, content about groundwater monitoring should naturally link to:

 - Piezometer Drilling
- Observation Wells

 Content about construction groundwater control should naturally link to:

 - Dewatering Wells
- Horizontal Drain Drilling

 Use existing patterns rather than introducing a new content system.

---

 # Step 11 — Images

 Inspect how existing service pages load their images.

 If appropriate assets already exist, reuse them.

 If the four new services have no assets, do not fabricate image paths that will produce broken images.

 Follow the repository's existing approach for missing service imagery.

 If placeholder/remote image handling exists, use it.

 Do not introduce external images unless the project's existing conventions explicitly allow them.

---

 # Step 12 — Technical quality

 After implementation:

 - run TypeScript checks
- run lint
- run the production build
- run tests if present
- inspect generated routes/metadata where possible
- check for broken links
- check that all 12 service URLs resolve
- check that existing 8 service URLs still resolve
- check sitemap output
- check canonical URLs
- check metadata uniqueness
- check for accidental duplicate titles/descriptions
- check mobile/UI implications of any service-list changes

 Fix issues rather than simply reporting them.

 Do not make unrelated refactors.

---

 # Git workflow

 Start from the latest `main`.

 Create a descriptive feature branch, for example:

```
feat/add-groundwater-monitoring-dewatering-services
```

 Make focused commits.

 A reasonable commit structure would be:

```
feat: add specialized groundwater service pages
feat: expand service seo and company positioning
feat: connect new services across resources and internal links
```

 You may consolidate commits if that better matches the repository's existing conventions.

 Push the branch.

 Open a PR against:

```
main
```

---

 # PR requirements

 The PR title should be concise and descriptive, for example:

```
Add groundwater monitoring and dewatering services
```

 The PR description should explain:

 ### What changed

 - Added four dedicated service pages
- Added service SEO metadata
- Expanded sitemap
- Added related-service/internal linking
- Updated company positioning
- Integrated new services with existing resources/SEO architecture

 ### Why

 Mega Resources offers more than conventional borehole drilling. The website should accurately represent its groundwater monitoring, observation, dewatering, and specialized drilling capabilities while creating dedicated search landing pages.

 ### SEO

 Mention:

 - four new crawlable service URLs
- unique metadata
- canonical URLs
- sitemap inclusion
- internal linking
- integration with existing resource/SEO strategy

 ### Validation

 List the checks you actually ran and their results.

 Do not claim checks passed if they were not run.

---

 # Important constraints

 1. **Do not refactor `components/home/services.tsx` into a single source of truth.**
2. **Do not rename existing service slugs.**
3. **Do not break existing service pages.**
4. **Do not create thin SEO pages.**
5. **Do not invent company claims, clients, project numbers, certifications, guarantees, or statistics.**
6. **Do not introduce a new SEO architecture when one already exists.**
7. **Do not unnecessarily rewrite unrelated content.**
8. **Do not keyword-stuff.**
9. **Do not add fake image paths.**
10. **Do not make the four new services merely "related" pages. They need their own canonical service URLs.**
11. **Do use related services and internal links to connect them to the existing service ecosystem.**
12. **Do inspect `app/resources` and existing SEO implementation before deciding how to integrate the new content.**
13. **Do preserve the site's existing design language and component patterns.**
14. **Do review the company's existing positioning throughout the site and broaden it where the current wording has become inaccurate.**

 ## Final deliverable

 The final result should be a clean PR that makes Mega Resources' website accurately represent the company as a broader groundwater and drilling services provider, with 12 first-class service URLs, while preserving the existing architecture and design decisions.
