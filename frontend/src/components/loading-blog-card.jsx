import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export const LoadingBlogCard = () => {
    return (
        // Correctly format the JSX comment
        <section className="grid py-20 gap-x-6 gap-y-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="relative flex flex-col justify-center">
                    <Skeleton className="object-cover rounded-md h-[400px]" />
                    
                    <Card className="border-none shadow-[0_0_15px_rgba(0_0_0/0.05)] min-[500px]:w-10/12 -mt-[20%] lg:-mt-[25%] place-self-center">
                        <CardHeader className="pb-4 bg-card">
                            <CardDescription className="flex flex-wrap items-center justify-between font-medium text-foreground text-md">
                                <Skeleton className="w-[180px] h-6"/>
                                <Skeleton className="w-8 h-5 rounded-full"/>
                            </CardDescription>
            
                            <CardTitle>
                                <Skeleton className="h-10 w-full"/>
                            </CardTitle>
                        </CardHeader>
            
                        <CardContent className="bg-card">
                            <p className="flex flex-wrap items-center justify-between gap-2">
                                <Skeleton className='h-8 w-14' />
                                <Skeleton className='h-8 w-14' />
                            </p>
            
                            <p className="mt-3">
                                <Skeleton className="h-5" />
                            </p>

                            <Skeleton className="h-8 w-32 rounded-full mt-4"/>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </section>
    )
}
