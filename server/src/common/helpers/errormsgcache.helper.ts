export class ErrorMsgCacheHelper {
  private static errorCache = new Map<string, string>();

  static setErrors(code: string, lang: string, description: string) {
    const key = `${code}-${lang}`;
    this.errorCache.set(key, description);
  }

  static getError(code: string, lang: string): string | null {
    return this.errorCache.get(`${code}-${lang}`) ?? null;
  }

  static hasError(code: string, lang: string): boolean {
    return this.errorCache.has(`${code}-${lang}`);
  }

  static getAllErrors(): Record<string, string> {
    return Object.fromEntries(this.errorCache);
  }

  static clearErrors() {
    this.errorCache.clear();
  }
}
