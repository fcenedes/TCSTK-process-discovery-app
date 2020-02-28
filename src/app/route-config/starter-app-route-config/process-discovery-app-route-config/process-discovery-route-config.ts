import { GeneralConfigResolver, AuthGuard } from '@tibco-tcstk/tc-core-lib';
import {
  AllGroupsResolver,
  AllRolesResolver,
  ClaimsResolver, LaConfigResolver,
  RolesResolver, GroupsResolver, CaseGuard, CaseDataResolver, FormConfigResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import {
  ProcessDiscoveryConfigResolver,
  PdCaseViewComponent,
  PdCaseComponent,
} from '@tibco-tcstk/tc-process-discovery-lib';
import { SpotfireConfigResolver } from '@tibco-tcstk/tc-spotfire-lib';
import { PdDatasourceCaseComponent } from 'projects/tibco-tcstk/tc-process-discovery-lib/src/lib/components/pd-datasource-case/pd-datasource-case.component';
import { PdFileManagementComponent } from 'projects/tibco-tcstk/tc-process-discovery-lib/src/lib/components/pd-file-management/pd-file-management.component';
import { FormResolver } from '@tibco-tcstk/tc-forms-lib';
import { PdBusinessProcessesComponent } from 'projects/tibco-tcstk/tc-process-discovery-lib/src/lib/components/pd-business-processes/pd-business-processes.component';

export const PROCESS_DISCOVERY_ROUTE_CONFIG = [
  {
    path: "case-view",
    component: PdCaseViewComponent,
    // canActivate: [SelectedRoleGuard],
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      rolesHolder: RolesResolver,
      groupsHolder: GroupsResolver,

    }
  },
  {
    path: 'case/:appId/:typeId/:caseRef',
    component: PdCaseComponent,
    canActivate: [AuthGuard, CaseGuard],
    resolve: {
      laConfigHolder: LaConfigResolver,
      spotfireConfigHolder: SpotfireConfigResolver,
      claims: ClaimsResolver,
      groups: GroupsResolver,
      roles: RolesResolver,
      caseDataHolder: CaseDataResolver,
      customFormDefs: FormResolver,
      formConfig: FormConfigResolver
    }
  },
  {
    path: "business-processes",
    component: PdBusinessProcessesComponent,
    // canActivate: [SelectedRoleGuard],
    resolve: {
      claims: ClaimsResolver,
      processDiscovery: ProcessDiscoveryConfigResolver
    }
  },
  {
    path: 'datasource/case/:appId/:typeId/:caseRef',
    component: PdDatasourceCaseComponent,
    canActivate: [AuthGuard, CaseGuard],
    resolve: {
      laConfigHolder: LaConfigResolver,
      claims: ClaimsResolver,
      groups: GroupsResolver,
      roles: RolesResolver,
      customFormDefs: FormResolver,
      // access: AccessResolver
      formConfig: FormConfigResolver
    }
  },
  {
    path: "file-management",
    component: PdFileManagementComponent,
    resolve: {
      claims: ClaimsResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: '**',
    redirectTo: '/starterApp/pd/case-view'
  }
];

export const PROCESS_DISCOVERY_ROUTE_PROVIDERS = [
  GeneralConfigResolver,
  ClaimsResolver,
  AllRolesResolver,
  AllGroupsResolver,
  ProcessDiscoveryConfigResolver,
  CaseDataResolver,
  FormResolver,
  FormConfigResolver
]
