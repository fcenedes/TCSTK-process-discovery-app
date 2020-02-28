import { GeneralConfigResolver, TibcoCloudSettingsGeneralComponent, GeneralLandingPageConfigResolver } from '@tibco-tcstk/tc-core-lib';
import {
  AllGroupsResolver,
  AllRolesResolver,
  ClaimsResolver,
  LaConfigResolver,
  LiveAppsSettingsComponent,
  LiveAppsSettingsRecentCasesComponent,
  LiveAppsSettingsRolesComponent,
  LiveAppsSettingsSummaryCardsComponent,
  LiveAppsSettingsAccessControlComponent,
  AccessControlConfigurationResolver,
  LiveAppsSettingsFormsComponent,
  LiveAppsSettingsLandingComponent,
  LiveAppsSettingsFormLayoutComponent,
  FormConfigResolver
} from '@tibco-tcstk/tc-liveapps-lib';
import { PdSettingsConfigurationComponent, ProcessDiscoveryConfigResolver, PdDatasourcesAdministrationComponent, PdFileManagementComponent, PdNewBusinessProcessComponent } from '@tibco-tcstk/tc-process-discovery-lib';
import { SettingsSpotfireComponent, SpotfireConfigResolver } from '@tibco-tcstk/tc-spotfire-lib';
import { PdSettingsTdvComponent } from 'projects/tibco-tcstk/tc-process-discovery-lib/src/lib/components/pd-settings-tdv/pd-settings-tdv.component';

export const CONFIGURATION_ROUTE_CONFIG = [
  {
    path: 'general-application-settings',
    component: TibcoCloudSettingsGeneralComponent,
    resolve: {
      generalConfigHolder: GeneralConfigResolver,
      claims: ClaimsResolver
    }
  },
  {
    path: 'general-application-roles',
    component: LiveAppsSettingsRolesComponent,
    resolve: {
      generalConfigHolder: GeneralConfigResolver,
      claims: ClaimsResolver,
      allRoles: AllRolesResolver,
      allGroups: AllGroupsResolver
    }
  },
  {
    path: 'general-application-landing-page',
    component: LiveAppsSettingsLandingComponent,
    resolve: {
      landingPagesConfigHolder: GeneralLandingPageConfigResolver,
      claims: ClaimsResolver,
      allRolesHolder: AllRolesResolver
    }
  },
  {
    path: 'general-application-access-control',
    component: LiveAppsSettingsAccessControlComponent,
    resolve: {
      claims: ClaimsResolver,
      accessControlConfigHolder: AccessControlConfigurationResolver,
      allRoles: AllRolesResolver
    }
  },
  {
    path: 'live-apps-app-selection',
    component: LiveAppsSettingsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-recent-cases',
    component: LiveAppsSettingsRecentCasesComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-summary-cards',
    component: LiveAppsSettingsSummaryCardsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-forms',
    component: LiveAppsSettingsFormsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-form-layout',
    component: LiveAppsSettingsFormLayoutComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver,
      formConfig: FormConfigResolver
    }
  },
  {
    path: 'spotfire-settings',
    component: SettingsSpotfireComponent,
    resolve: {
      spotfireConfigHolder: SpotfireConfigResolver,
      claimsHolder: ClaimsResolver
    }
  },
  {
    path: 'process-discovery-configuration',
    component: PdSettingsConfigurationComponent,
    resolve: {
      claims: ClaimsResolver,
      processDiscovery: ProcessDiscoveryConfigResolver
    }
  },
  {
    path: 'process-discovery-analysis',
    component: PdDatasourcesAdministrationComponent,
    // canActivate: [SelectedRoleGuard],
    resolve: {
      claims: ClaimsResolver,
      processDiscovery: ProcessDiscoveryConfigResolver
    }
  },
  {
    path: "new-analysis",
    component: PdNewBusinessProcessComponent,
    resolve: {
      claims: ClaimsResolver,
      processDiscovery: ProcessDiscoveryConfigResolver
    }
  },
  {
    path: 'process-discovery-file-management',
    component: PdFileManagementComponent,
    resolve: {
      claims: ClaimsResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'process-discovery-data-virtualization',
    component: PdSettingsTdvComponent
  },
  {
    path: '**',
    redirectTo: '/starterApp/configuration/general-application-settings'
  }
];

export const CONFIGURATION_ROUTE_PROVIDERS = [
  GeneralConfigResolver,
  ClaimsResolver,
  AllRolesResolver,
  AllGroupsResolver,
  GeneralLandingPageConfigResolver,
  SpotfireConfigResolver,
  ProcessDiscoveryConfigResolver,
  AccessControlConfigurationResolver,
  FormConfigResolver
];
