/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: number;
 *  name: string;
 *  email: string;
 *  veichle: string
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 **/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
