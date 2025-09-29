/**
 * Helper para type assertions seguras en objetos de Adobe.
 * Usa 'unknown' como paso intermedio para evitar errores de TypeScript.
 */
export function asAdobeType<T>(value: any): T {
    return value as unknown as T;
}

/**
 * Type guard para verificar si un objeto es de un tipo específico de Adobe.
 * Útil para validaciones antes de acceder a propiedades.
 */
export function isAdobeType<T>(value: any, constructor: new (...args: any[]) => T): value is T {
    return value instanceof constructor;
}