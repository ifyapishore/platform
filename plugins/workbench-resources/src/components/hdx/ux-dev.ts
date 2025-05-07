import type { IntlString } from '@hcengineering/platform'

export function i18nt (txt: string): IntlString {
  return txt as any as IntlString
}
