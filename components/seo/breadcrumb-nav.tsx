import Link from "next/link";
export function BreadcrumbNav({ items }: { items: Array<{ name: string; path: string }> }) {
  return <nav aria-label="Breadcrumb" className="mx-auto w-[min(100%,76rem)] px-5 pt-28 md:px-10 md:pt-36">
    <ol className="flex flex-wrap gap-2 text-sm text-muted-foreground">
      {items.map((item, index) => <li key={item.path} className="flex gap-2">
        {index === items.length - 1 ? <span className="text-foreground" aria-current="page">{item.name}</span> : <>
          <Link href={item.path} className="hover:text-blue-600">{item.name}</Link><span aria-hidden="true">/</span>
        </>}
      </li>)}
    </ol>
  </nav>;
}
