import {
    AuthGuard,
    ConfigurationMenuConfigResolver,
    GeneralConfigResolver,
    GeneralLandingPageConfigResolver,
} from '@tibco-tcstk/tc-core-lib';
import {
    AccessResolver,
    CaseGuard,
    ClaimsResolver,
    GroupsResolver,
    LaConfigResolver,
    LiveAppsConfigResolver, RoleGuard,
    RolesResolver,
    LiveAppsLandingPageComponent,
    RoleActiveResolver,
    FormConfigResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import { CaseComponent } from '../../routes/case/case.component';
import { ConfigurationComponent } from '../../routes/configuration/configuration.component';
import { CONFIGURATION_ROUTE_CONFIG, CONFIGURATION_ROUTE_PROVIDERS } from './configuration-route-config/configuration-route-config';
import { PROCESS_DISCOVERY_ROUTE_CONFIG, PROCESS_DISCOVERY_ROUTE_PROVIDERS } from './process-discovery-app-route-config/process-discovery-route-config';
import { FormResolver } from '@tibco-tcstk/tc-forms-lib';
import { PdCockpitComponent } from '@tibco-tcstk/tc-process-discovery-lib';
import { SpotfireConfigResolver } from '@tibco-tcstk/tc-spotfire-lib';
import { SplashComponent } from 'src/app/routes/splash/splash.component';

export const HOME_ROUTE = 'home';

export const STARTER_APP_ROUTES = [
    {
        path: 'home',
        component: SplashComponent,
        resolve: {
            generalConfigHolder: GeneralConfigResolver,
            activeRoleHolder: RoleActiveResolver
        }
    },
    // {
    //     path: 'home',
    //     component: HomeComponent,
    //     canActivate: [AuthGuard],
    //     resolve: {
    //         claims: ClaimsResolver,
    //         laConfigHolder: LaConfigResolver,
    //         groups: GroupsResolver,
    //         roles: RolesResolver,
    //         access: AccessResolver,
    //         customFormDefs: FormResolver
    //     }
    // },
    {
        path: 'case/:appId/:typeId/:caseRef',
        component: CaseComponent,
        canActivate: [AuthGuard, CaseGuard],
        resolve: {
            laConfigHolder: LaConfigResolver,
            claims: ClaimsResolver,
            groups: GroupsResolver,
            roles: RolesResolver,
            access: AccessResolver,
            customFormDefs: FormResolver,
            formConfig: FormConfigResolver
        }
    },
    {
        path: 'configuration',
        component: ConfigurationComponent,
        canActivate: [
            AuthGuard
            // RoleGuard
        ],
        resolve: {
            configurationMenuHolder: ConfigurationMenuConfigResolver
        },
        children: CONFIGURATION_ROUTE_CONFIG
    },
    {
        path: 'pd',
        component: PdCockpitComponent,
        resolve: {
            claims: ClaimsResolver,
            generalConfigHolder: GeneralConfigResolver,
            laConfigHolder: LaConfigResolver,
            rolesHolder: RolesResolver,
            customFormDefs: FormResolver,
            spotfireConfigHolder: SpotfireConfigResolver,
            formConfig: FormConfigResolver
        },
        children: PROCESS_DISCOVERY_ROUTE_CONFIG
    }
];

export const STARTER_APP_PROVIDERS = [
    [
        ClaimsResolver,
        LiveAppsConfigResolver,
        LaConfigResolver,
        GeneralConfigResolver,
        ConfigurationMenuConfigResolver,
        RolesResolver,
        GroupsResolver,
        AccessResolver,
        FormResolver,
        RoleActiveResolver,
        GeneralLandingPageConfigResolver,
        SpotfireConfigResolver,
        FormConfigResolver
    ],
    CONFIGURATION_ROUTE_PROVIDERS,
    PROCESS_DISCOVERY_ROUTE_PROVIDERS
];

