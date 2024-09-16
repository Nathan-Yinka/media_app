import { LoadingBlogCard } from "./loading-blog-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export const  LoadingHome = () => {

    return (
        <div className="w-full container pt-[76px]">
            <section className="flex gap-8  mt-8 max-md:flex-col">
                <Skeleton className="flex-1 max-w-[400px] rounded-1-2xl h-[440px]"/>

                <div className="py-2 flex-grow">
                    <Skeleton className="h-7 w-[180px]" />
                    <Skeleton className="mt-3 h-16"/>
                    <Skeleton className="mt-3 max-w-lg h-5"/>



                    <p className="flex flex-wrap items-center justify-between sm:text-sm mt-4">
                        <Skeleton className="h-2" />
                        <Skeleton className="h-2" />
                    </p>

                    <Skeleton className="mt-3 h-8" />
                        <Skeleton
                            className="mt-3 w-[180px] rounded-full h-10"
                        />
                </div>
            </section>

            {/* Blog Card Preview */}
            <section>
               <LoadingBlogCard />
            </section>
        </div>
    )
}