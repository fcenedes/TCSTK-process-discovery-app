import { GeneralConfigResolver, AuthGuard } from '@tibco-tcstk/tc-core-lib';
import {
    AllGroupsResolver,
    AllRolesResolver,
    ClaimsResolver, LaConfigResolver,
    RolesResolver, GroupsResolver, CaseGuard, CaseDataResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import { 
    PdProcessMiningComponent, 
    ProcessDiscoveryConfigResolver, 
    PdCaseViewComponent,
    PdDatasourcesAdministrationComponent,
    PdNewDatasourceComponent,
    PdCaseComponent,
    PdNewBusinessProcessComponent
 } from '@tibco-tcstk/tc-process-discovery-lib';
import { SpotfireConfigResolver } from '@tibco-tcstk/tc-spotfire-lib';
import { PdDatasourceCaseComponent } from 'projects/tibco-tcstk/tc-process-discovery-lib/src/lib/components/pd-datasource-case/pd-datasource-case.component';
import { PdFileManagementComponent } from 'projects/tibco-tcstk/tc-process-discovery-lib/src/lib/components/pd-file-management/pd-file-management.component';
import { FormResolver } from '@tibco-tcstk/tc-forms-lib';

export const PROCESS_DISCOVERY_ROUTE_CONFIG = [
    {
        path: "process-mining-view",
        component: PdProcessMiningComponent,
        // canActivate: [SelectedRoleGuard],
        resolve: {
            claims: ClaimsResolver,
            laConfigHolder: LaConfigResolver,
            processDiscoverConfigHolder: ProcessDiscoveryConfigResolver, 
            spotfireConfigHolder: SpotfireConfigResolver,
            rolesHolder: RolesResolver,
            groupsHolder: GroupsResolver
        }
    },
    {
        path: "case-view",
        component: PdCaseViewComponent,
        // canActivate: [SelectedRoleGuard],
        resolve: {
            claims: ClaimsResolver,
            laConfigHolder: LaConfigResolver,
            rolesHolder: RolesResolver,
            groupsHolder: GroupsResolver
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
            customFormDefs: FormResolver
        }
    },
    {
        path: "business-processes",
        component: PdDatasourcesAdministrationComponent,
        // canActivate: [SelectedRoleGuard],
        resolve: {
            claims: ClaimsResolver,
            processDiscovery: ProcessDiscoveryConfigResolver
        }
    },
    {
        path: "new-datasource",
        component: PdNewBusinessProcessComponent,
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
            customFormDefs: FormResolver
            // access: AccessResolver
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
    FormResolver
]
