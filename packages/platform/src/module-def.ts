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
import { Metadata } from './metadata'
import { Plugin, Resource, StatusCode } from './core-types'
import { plugin } from './platform'
import { PluginLoader, PluginModule, Resources } from './resource'
/**
 * @public
 */
export const platformId = 'platform' as Plugin

export default plugin(platformId, {
  status: {
    OK: '' as StatusCode,
    BadError: '' as StatusCode,
    UnknownError: '' as StatusCode<{ message: string }>,
    InvalidId: '' as StatusCode<{ id: string }>,
    ConnectionClosed: '' as StatusCode,

    LoadingPlugin: '' as StatusCode<{ plugin: string }>,
    NoLocationForPlugin: '' as StatusCode<{ plugin: Plugin }>,
    ResourceNotFound: '' as StatusCode<{ resource: Resource<any> }>,

    NoLoaderForStrings: '' as StatusCode<{ plugin: Plugin }>,

    BadRequest: '' as StatusCode,
    Forbidden: '' as StatusCode,
    Unauthorized: '' as StatusCode,
    ExpiredLink: '' as StatusCode,
    UnknownMethod: '' as StatusCode<{ method: string }>,
    InternalServerError: '' as StatusCode,
    MaintenanceWarning: '' as StatusCode<{ time: number }>,
    AccountNotFound: '' as StatusCode<{ account?: string }>,
    AccountMismatch: '' as StatusCode<{ account?: string, requiredAccount?: string }>,
    AccountNotConfirmed: '' as StatusCode,
    WorkspaceNotFound: '' as StatusCode<{ workspaceUuid?: string, workspaceName?: string, workspaceUrl?: string }>,
    WorkspaceArchived: '' as StatusCode<{ workspaceUuid: string }>,
    WorkspaceMigration: '' as StatusCode<{ workspaceUuid: string }>,
    SocialIdNotFound: '' as StatusCode<{ value?: string, type?: string, _id?: string }>,
    SocialIdNotConfirmed: '' as StatusCode<{ socialId: string, type: string }>,
    SocialIdAlreadyConfirmed: '' as StatusCode<{ socialId: string, type: string }>,
    IntegrationAlreadyExists: '' as StatusCode,
    IntegrationNotFound: '' as StatusCode,
    IntegrationSecretAlreadyExists: '' as StatusCode,
    IntegrationSecretNotFound: '' as StatusCode,
    PersonNotFound: '' as StatusCode<{ person: string }>,
    InvalidPassword: '' as StatusCode<{ account: string }>,
    AccountAlreadyExists: '' as StatusCode,
    WorkspaceAlreadyExists: '' as StatusCode<{ workspace: string }>,
    WorkspaceRateLimit: '' as StatusCode<{ workspace: string }>,
    WorkspaceLimitReached: '' as StatusCode<{ workspace: string }>,
    InvalidOtp: '' as StatusCode,
    InviteNotFound: '' as StatusCode<{ email: string }>,
    MailboxError: '' as StatusCode<{ reason: string }>,
    SocialIdAlreadyExists: '' as StatusCode
  },
  metadata: {
    locale: '' as Metadata<string>,
    LoadHelper: '' as Metadata<<T extends Resources>(loader: PluginLoader<T>) => Promise<PluginModule<T>>>
  }
})
