//
// Copyright © 2023 Hardcore Engineering Inc.
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
//

import {
  AttachedDoc,
  Class,
  Collection,
  Doc,
  PersonId,
  Ref,
  SocialId,
  Space,
  Timestamp,
  UXObject,
  Permission,
  type BasePerson,
  type Blob,
  type MarkupBlobRef,
  type Data,
  type WithLookup,
  AccountUuid
} from '@hcengineering/core'

import { IntlString, Resource } from '@hcengineering/platform'
import type { AnyComponent, ColorDefinition } from '@hcengineering/ui'
import { Action } from '@hcengineering/view'
import { Card, Role } from '@hcengineering/card'

/**
 * @public
 */
export interface ChannelProvider extends Doc, UXObject {
  // Placeholder
  placeholder: IntlString

  // Presenter will be shown on click for channel
  presenter?: AnyComponent

  // Action to be performed if there is no presenter defined.
  action?: Ref<Action>

  // Integration type
  integrationType?: Ref<Doc>
}

export interface SocialIdentity extends SocialId, AttachedDoc {
  _id: Ref<this> & PersonId
  attachedTo: Ref<Person>
  attachedToClass: Ref<Class<Person>>
}

export type SocialIdentityRef = SocialIdentity['_id']

/**
 * @public
 */
export interface Channel extends AttachedDoc {
  provider: Ref<ChannelProvider>
  value: string
  items?: number
  lastMessage?: Timestamp
}

/**
 * @public
 */
export interface ChannelItem extends AttachedDoc {
  attachedTo: Ref<Channel>
  attachedToClass: Ref<Class<Channel>>
  incoming: boolean
  sendOn: Timestamp
  attachments?: number
}

/**
 * @public
 */
export enum AvatarType {
  COLOR = 'color',
  IMAGE = 'image',
  GRAVATAR = 'gravatar',

  EXTERNAL = 'external'
}

/**
 * @public
 */
export type GetAvatarUrl = (
  uri: Data<WithLookup<AvatarInfo>>,
  name: string,
  width?: number
) => Promise<{ url?: string, srcSet?: string, color: ColorDefinition }>

/**
 * @public
 */
export interface AvatarProvider extends Doc {
  type: AvatarType
  getUrl: Resource<GetAvatarUrl>
}

export interface AvatarInfo extends Doc {
  avatarType: AvatarType
  avatar?: Ref<Blob> | null
  avatarProps?: {
    color?: string
    url?: string
  }
}

/**
 * @public
 */
export interface Contact extends Doc, AvatarInfo {
  name: string
  attachments?: number
  comments?: number
  channels?: number
  city?: string
}

/**
 * @public
 */
export interface Person extends Contact, BasePerson {
  birthday?: Timestamp | null
  socialIds?: Collection<SocialIdentity>
  profile?: Ref<Card>
}

export interface UserRole extends Doc {
  user: Ref<Employee>
  role: Ref<Role>
}

/**
 * @public
 */
export interface Member extends AttachedDoc {
  contact: Ref<Contact>
}
/**
 * @public
 */
export interface Organization extends Contact {
  members: number
  description: MarkupBlobRef | null
}

/**
 * @public
 */
export interface Status extends AttachedDoc {
  attachedTo: Ref<Employee>
  attachedToClass: Ref<Class<Employee>>
  name: string
  dueDate: Timestamp
}

/**
 * @public
 */
export interface Employee extends Person {
  active: boolean
  role?: 'USER' | 'GUEST' // Informational only
  statuses?: number
  position?: string | null
  personUuid?: AccountUuid
}

/**
 * @public
 */
export interface ContactsTab extends Doc {
  label: IntlString
  component: AnyComponent
  index: number
}

export interface PersonSpace extends Space {
  person: Ref<Person>
}

/**
 * @public
 */
export type GravatarPlaceholderType =
  | '404'
  | 'mp'
  | 'identicon'
  | 'monsterid'
  | 'wavatar'
  | 'retro'
  | 'robohash'
  | 'blank'

/**
 * @public
 */
export const AVATAR_COLORS: ColorDefinition[] = [
  { name: 'blue', color: '#4674ca' }, // blue
  { name: 'blue_dark', color: '#315cac' }, // blue_dark
  { name: 'green', color: '#57be8c' }, // green
  { name: 'green_dark', color: '#3fa372' }, // green_dark
  { name: 'yellow_orange', color: '#f9a66d' }, // yellow_orange
  { name: 'red', color: '#ec5e44' }, // red
  { name: 'red_dark', color: '#e63717' }, // red_dark
  { name: 'pink', color: '#f868bc' }, // pink
  { name: 'purple', color: '#6c5fc7' }, // purple
  { name: 'purple_dark', color: '#4e3fb4' }, // purple_dark
  { name: 'teal', color: '#57b1be' }, // teal
  { name: 'gray', color: '#847a8c' } // gray
]

export type PermissionsBySpace = Record<Ref<Space>, Set<Ref<Permission>>>
export type PersonsByPermission = Record<Ref<Space>, Record<Ref<Permission>, Set<Ref<Person>>>>
export interface PermissionsStore {
  ps: PermissionsBySpace
  ap: PersonsByPermission
  whitelist: Set<Ref<Space>>
}

export type UserProfile = Card & { person: Ref<Person> }
