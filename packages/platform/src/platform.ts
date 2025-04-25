/*!
// Copyright © 2020, 2021 Anticrm Platform Contributors.
// Copyright © 2021 Hardcore Engineering Inc.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
*/
import { IntlString, _EmbeddedId, Namespace, Plugin, _ID_SEPARATOR } from './core-types'

function identify (result: Record<string, any>, prefix: string, namespace: Record<string, any>): Namespace {
  for (const key in namespace) {
    const value = namespace[key]
    if (typeof result[key] === 'string') {
      throw new Error(`'identify' overwrites '${key}' for ${prefix}`)
    }
    const ident = prefix + _ID_SEPARATOR + key
    result[key] = typeof value === 'string' ? ident : identify(result[key] ?? {}, ident, value)
  }
  return result
}

/**
 * @public
 */
export function getEmbeddedLabel (str: string): IntlString {
  return (_EmbeddedId + _ID_SEPARATOR + _EmbeddedId + _ID_SEPARATOR + str) as IntlString
}

/**
 * Defines plugin Ids.
 *
 * @public
 * @param plugin -
 * @param namespace -
 * @returns
 */
export function plugin<N extends Namespace> (plugin: Plugin, namespace: N): N {
  return identify({}, plugin, namespace) as N
}

/**
 * Merges plugin Ids with Ids provided.
 *
 * @public
 * @param plugin -
 * @param ns -
 * @param merge -
 * @returns
 */
export function mergeIds<N extends Namespace, M extends Namespace> (plugin: Plugin, ns: N, merge: M): N & M {
  return identify({ ...ns }, plugin, merge) as N & M
}
