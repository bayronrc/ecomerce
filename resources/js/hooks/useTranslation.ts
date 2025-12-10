import { usePage } from "@inertiajs/react";
import { PageProps } from "../types";

interface NewPageProps extends PageProps {
    translations: Record<string, any>;
    locale: string;
}

export function useTranslation() {
    const { translations, locale } = usePage<NewPageProps>().props;

    /**
     * Función principal de traducción
     * @param key - Clave de traducción (ej: "messages.welcome" o "Home")
     * @param replacements - Objeto con reemplazos {name: 'Juan'}
     */
    const t = (
        key: string,
        replacements?: Record<string, string | number>
    ): string => {
        let translation = getNestedTranslation(key);

        // Si no se encuentra, devolver la clave
        if (!translation) {
            return key;
        }

        // Aplicar reemplazos si existen
        if (replacements) {
            Object.keys(replacements).forEach((replaceKey) => {
                translation = translation.replace(
                    new RegExp(`:${replaceKey}`, "g"),
                    String(replacements[replaceKey])
                );
            });
        }

        return translation;
    };

    /**
     * Obtener traducción anidada
     */
    const getNestedTranslation = (key: string): string => {
        // Primero intentar con traducciones JSON (para claves simples)
        if (translations.json && translations.json[key]) {
            return translations.json[key];
        }

        // Luego intentar con traducciones anidadas (ej: "messages.welcome")
        const keys = key.split(".");
        let result: any = translations;

        for (const k of keys) {
            if (result && typeof result === "object" && k in result) {
                result = result[k];
            } else {
                return key; // No encontrado
            }
        }

        return typeof result === "string" ? result : key;
    };

    /**
     * Traducción con pluralización
     */
    const tChoice = (
        key: string,
        count: number,
        replacements?: Record<string, string | number>
    ): string => {
        const translation = t(key, { ...replacements, count });

        // Lógica simple de pluralización (puedes mejorarla)
        if (count === 1) {
            return translation.replace(/\|.*/, ""); // Tomar singular
        } else {
            return translation.replace(/.*\|/, ""); // Tomar plural
        }
    };

    return {
        t,
        tChoice,
        locale,
        translations,
    };
}
