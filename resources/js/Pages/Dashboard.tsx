import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Head } from "@inertiajs/react";
import Authenticated from "../Layouts/AuthenticatedLayout";
export default function Dashboard() {
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">
                                Resumen
                            </h2>
                            <div className="flex items-center space-x-2">
                                <Button>Descargar Reporte</Button>
                            </div>
                        </div>

                        <Tabs defaultValue="overview" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="overview">
                                    Vista General
                                </TabsTrigger>
                                <TabsTrigger value="analytics">
                                    Analíticas
                                </TabsTrigger>
                                <TabsTrigger value="reports">
                                    Reportes
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                                {/* Tarjetas de Estadísticas */}
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Ingresos Totales
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                $45,231.89
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                +20.1% del mes pasado
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Suscripciones
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                +2350
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                +180.1% del mes pasado
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Ventas
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <rect
                                                    width="20"
                                                    height="14"
                                                    x="2"
                                                    y="5"
                                                    rx="2"
                                                />
                                                <path d="M2 10h20" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                +12,234
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                +19% del mes pasado
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Activos Ahora
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                +573
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                +201 desde la última hora
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                    {/* Gráfica Principal */}
                                    <Card className="col-span-4">
                                        <CardHeader>
                                            <CardTitle>Resumen Anual</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pl-2">
                                            <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md border border-dashed">
                                                <span className="text-muted-foreground text-sm">
                                                    Gráfica Placeholder
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Ventas Recientes */}
                                    <Card className="col-span-3">
                                        <CardHeader>
                                            <CardTitle>
                                                Ventas Recientes
                                            </CardTitle>
                                            <CardDescription>
                                                Hiciste 265 ventas este mes.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-8">
                                                {/* Ejemplo de items de lista */}
                                                <div className="flex items-center">
                                                    <div className="ml-4 space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            Olivia Martin
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            olivia.martin@email.com
                                                        </p>
                                                    </div>
                                                    <div className="ml-auto font-medium">
                                                        +$1,999.00
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="ml-4 space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            Jackson Lee
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            jackson.lee@email.com
                                                        </p>
                                                    </div>
                                                    <div className="ml-auto font-medium">
                                                        +$39.00
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
