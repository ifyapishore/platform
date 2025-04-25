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
/**
 * Id in format 'plugin.resource-kind.id'
 *
 * @public
 */
export type Id = string & { __id: true }

/**
 * Plugin Id
 *
 * @public
 */
export type Plugin = string & { __plugin: true }

/**
 * Platform Resource Identifier (PRI)
 *
 * @remarks
 *
 * Almost anything in the Anticrm Platform is a `Resource`. Resources referenced by Platform Resource Identifier (PRI).
 *
 * @example
 * ```typescript
 *   `core.string.ClassLabel` as Resource<string> // translated string according to current language and i18n settings
 *   `workbench.icon.Add` as Resource<URL> // URL to SVG sprites
 * ```
 *
 * @public
 */
export type Resource<T> = Id & { __resource: T }

/**
 * Internationalized string Id
 *
 * @public
 */
export type IntlString<T extends Record<string, any> = any> = Id & { __intl_string: T }

/**
 * Status Code. Also works as i18n string Id for status description.
 *
 * @public
 */
export type StatusCode<T extends Record<string, any> = any> = IntlString<T>

/**
 * @public
 */
export type Namespace = Record<string, Record<string, string>>

/**
 * @internal
 */
export const _ID_SEPARATOR = ':'

/**
 * @internal
 */
export const _EmbeddedId = 'embedded'
