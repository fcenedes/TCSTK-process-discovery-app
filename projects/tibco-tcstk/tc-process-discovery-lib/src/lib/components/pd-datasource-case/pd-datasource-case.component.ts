import { Component, OnInit} from '@angular/core';
import { LiveAppsCaseCockpitComponent, LiveAppsConfig, Groups, Roles, RouteAccessControlConfig } from '@tibco-tcstk/tc-liveapps-lib';
import { GeneralConfig, Claim, Sandbox, RouteAction } from '@tibco-tcstk/tc-core-lib';
import { CustomFormDefs } from '@tibco-tcstk/tc-forms-lib';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'tcpd-pd-datasource-case',
    templateUrl: './pd-datasource-case.component.html',
    styleUrls: ['./pd-datasource-case.component.css']
})
export class PdDatasourceCaseComponent implements OnInit {

    public generalConfig: GeneralConfig;
    public liveAppsConfig: LiveAppsConfig;
    public exclRecentAppIds: string[];
    public claims: Claim;
    public sandbox: Sandbox;
    public caseRef: string;
    public appId: string;
    public typeId: string;
    public groups: Groups;
    public roles: Roles;
    public access: RouteAccessControlConfig;
    public customFormDefs: CustomFormDefs;
    public workitemId: number;

    public layout: any[] = undefined;
    // you can use a layout here to override the default layout for case data
    // take the generated layout JSON from console.log, re-order it in a JSON tool then put contents as the layout array:
    // eg:
    // public layout = JSON.parse('[{"_id":"141","arrayItem":false,"dataPointer":"/Investigation_v1","dataType":"object","options":{"listItems":1,"addable":true,"orderable":true,"removable":true,"enableErrorState":true,"enableSuccessState":true,"feedback":false,"feedbackOnRender":false,"notitle":false,"disabled":false,"readonly":true,"returnEmptyFields":true,"validationMessages":{"required":"This field is required.","minLength":"Must be {{minimumLength}} characters or longer (current length: {{currentLength}})","maxLength":"Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})","pattern":"Must match pattern: {{requiredPattern}}","minimum":"Must be {{minimumValue}} or more","exclusiveMinimum":"Must be more than {{exclusiveMinimumValue}}","maximum":"Must be {{maximumValue}} or less","exclusiveMaximum":"Must be less than {{exclusiveMaximumValue}}","minProperties":"Must have {{minimumProperties}} or more items (current items: {{currentProperties}})","maxProperties":"Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})","minItems":"Must have {{minimumItems}} or more items (current items: {{currentItems}})","maxItems":"Must have {{maximumItems}} or fewer items (current items: {{currentItems}})","uniqueItems":"All items must be unique"},"appearance":"legacy","title":"Investigation","required":false},"required":false,"type":"section","name":"Investigation_v1","items":[{"_id":"142","arrayItem":false,"dataPointer":"/Investigation_v1/Status_v1","dataType":"string","options":{"listItems":1,"addable":true,"orderable":true,"removable":true,"enableErrorState":true,"enableSuccessState":true,"feedback":false,"feedbackOnRender":false,"notitle":false,"disabled":false,"readonly":true,"returnEmptyFields":true,"validationMessages":{"required":"This field is required.","minLength":"Must be {{minimumLength}} characters or longer (current length: {{currentLength}})","maxLength":"Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})","pattern":"Must match pattern: {{requiredPattern}}","minimum":"Must be {{minimumValue}} or more","exclusiveMinimum":"Must be more than {{exclusiveMinimumValue}}","maximum":"Must be {{maximumValue}} or less","exclusiveMaximum":"Must be less than {{exclusiveMaximumValue}}","minProperties":"Must have {{minimumProperties}} or more items (current items: {{currentProperties}})","maxProperties":"Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})","minItems":"Must have {{minimumItems}} or more items (current items: {{currentItems}})","maxItems":"Must have {{maximumItems}} or fewer items (current items: {{currentItems}})","uniqueItems":"All items must be unique"},"appearance":"legacy","maxLength":400,"title":"Status Comment","required":false},"required":false,"type":"text","name":"Status_v1"},{"_id":"143","arrayItem":false,"dataPointer":"/Investigation_v1/Assignee_v1","dataType":"object","options":{"listItems":1,"addable":true,"orderable":true,"removable":true,"enableErrorState":true,"enableSuccessState":true,"feedback":false,"feedbackOnRender":false,"notitle":false,"disabled":false,"readonly":true,"returnEmptyFields":true,"validationMessages":{"required":"This field is required.","minLength":"Must be {{minimumLength}} characters or longer (current length: {{currentLength}})","maxLength":"Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})","pattern":"Must match pattern: {{requiredPattern}}","minimum":"Must be {{minimumValue}} or more","exclusiveMinimum":"Must be more than {{exclusiveMinimumValue}}","maximum":"Must be {{maximumValue}} or less","exclusiveMaximum":"Must be less than {{exclusiveMaximumValue}}","minProperties":"Must have {{minimumProperties}} or more items (current items: {{currentProperties}})","maxProperties":"Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})","minItems":"Must have {{minimumItems}} or more items (current items: {{currentItems}})","maxItems":"Must have {{maximumItems}} or fewer items (current items: {{currentItems}})","uniqueItems":"All items must be unique"},"appearance":"legacy","title":"Assignee","required":false},"required":false,"type":"section","name":"Assignee_v1","items":[{"_id":"144","arrayItem":false,"dataPointer":"/Investigation_v1/Assignee_v1/id","dataType":"string","options":{"listItems":1,"addable":true,"orderable":true,"removable":true,"enableErrorState":true,"enableSuccessState":true,"feedback":false,"feedbackOnRender":false,"notitle":false,"disabled":false,"readonly":true,"returnEmptyFields":true,"validationMessages":{"required":"This field is required.","minLength":"Must be {{minimumLength}} characters or longer (current length: {{currentLength}})","maxLength":"Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})","pattern":"Must match pattern: {{requiredPattern}}","minimum":"Must be {{minimumValue}} or more","exclusiveMinimum":"Must be more than {{exclusiveMinimumValue}}","maximum":"Must be {{maximumValue}} or less","exclusiveMaximum":"Must be less than {{exclusiveMaximumValue}}","minProperties":"Must have {{minimumProperties}} or more items (current items: {{currentProperties}})","maxProperties":"Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})","minItems":"Must have {{minimumItems}} or more items (current items: {{currentItems}})","maxItems":"Must have {{maximumItems}} or fewer items (current items: {{currentItems}})","uniqueItems":"All items must be unique"},"appearance":"legacy","title":"id","required":false},"required":false,"type":"text","name":"id"},{"_id":"145","arrayItem":false,"dataPointer":"/Investigation_v1/Assignee_v1/name","dataType":"string","options":{"listItems":1,"addable":true,"orderable":true,"removable":true,"enableErrorState":true,"enableSuccessState":true,"feedback":false,"feedbackOnRender":false,"notitle":false,"disabled":false,"readonly":true,"returnEmptyFields":true,"validationMessages":{"required":"This field is required.","minLength":"Must be {{minimumLength}} characters or longer (current length: {{currentLength}})","maxLength":"Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})","pattern":"Must match pattern: {{requiredPattern}}","minimum":"Must be {{minimumValue}} or more","exclusiveMinimum":"Must be more than {{exclusiveMinimumValue}}","maximum":"Must be {{maximumValue}} or less","exclusiveMaximum":"Must be less than {{exclusiveMaximumValue}}","minProperties":"Must have {{minimumProperties}} or more items (current items: {{currentProperties}})","maxProperties":"Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})","minItems":"Must have {{minimumItems}} or more items (current items: {{currentItems}})","maxItems":"Must have {{maximumItems}} or fewer items (current items: {{currentItems}})","uniqueItems":"All items must be unique"},"appearance":"legacy","title":"name","required":false},"required":false,"type":"text","name":"name"},{"_id":"146","arrayItem":false,"dataPointer":"/Investigation_v1/Assignee_v1/firstName","dataType":"string","options":{"listItems":1,"addable":true,"orderable":true,"removable":true,"enableErrorState":true,"enableSuccessState":true,"feedback":false,"feedbackOnRender":false,"notitle":false,"disabled":false,"readonly":true,"returnEmptyFields":true,"validationMessages":{"required":"This field is required.","minLength":"Must be {{minimumLength}} characters or longer (current length: {{currentLength}})","maxLength":"Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})","pattern":"Must match pattern: {{requiredPattern}}","minimum":"Must be {{minimumValue}} or more","exclusiveMinimum":"Must be more than {{exclusiveMinimumValue}}","maximum":"Must be {{maximumValue}} or less","exclusiveMaximum":"Must be less than {{exclusiveMaximumValue}}","minProperties":"Must have {{minimumProperties}} or more items (current items: {{currentProperties}})","maxProperties":"Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})","minItems":"Must have {{minimumItems}} or more items (current items: {{currentItems}})","maxItems":"Must have {{maximumItems}} or fewer items (current items: {{currentItems}})","uniqueItems":"All items must be unique"},"appearance":"legacy","title":"firstName","required":false},"required":false,"type":"text","name":"firstName"},{"_id":"147","arrayItem":false,"dataPointer":"/Investigation_v1/Assignee_v1/lastName","dataType":"string","options":{"listItems":1,"addable":true,"orderable":true,"removable":true,"enableErrorState":true,"enableSuccessState":true,"feedback":false,"feedbackOnRender":false,"notitle":false,"disabled":false,"readonly":true,"returnEmptyFields":true,"validationMessages":{"required":"This field is required.","minLength":"Must be {{minimumLength}} characters or longer (current length: {{currentLength}})","maxLength":"Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})","pattern":"Must match pattern: {{requiredPattern}}","minimum":"Must be {{minimumValue}} or more","exclusiveMinimum":"Must be more than {{exclusiveMinimumValue}}","maximum":"Must be {{maximumValue}} or less","exclusiveMaximum":"Must be less than {{exclusiveMaximumValue}}","minProperties":"Must have {{minimumProperties}} or more items (current items: {{currentProperties}})","maxProperties":"Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})","minItems":"Must have {{minimumItems}} or more items (current items: {{currentItems}})","maxItems":"Must have {{maximumItems}} or fewer items (current items: {{currentItems}})","uniqueItems":"All items must be unique"},"appearance":"legacy","title":"lastName","required":false},"required":false,"type":"text","name":"lastName"},{"_id":"148","arrayItem":false,"dataPointer":"/Investigation_v1/Assignee_v1/email","dataType":"string","options":{"listItems":1,"addable":true,"orderable":true,"removable":true,"enableErrorState":true,"enableSuccessState":true,"feedback":false,"feedbackOnRender":false,"notitle":false,"disabled":false,"readonly":true,"returnEmptyFields":true,"validationMessages":{"required":"This field is required.","minLength":"Must be {{minimumLength}} characters or longer (current length: {{currentLength}})","maxLength":"Must be {{maximumLength}} characters or shorter (current length: {{currentLength}})","pattern":"Must match pattern: {{requiredPattern}}","minimum":"Must be {{minimumValue}} or more","exclusiveMinimum":"Must be more than {{exclusiveMinimumValue}}","maximum":"Must be {{maximumValue}} or less","exclusiveMaximum":"Must be less than {{exclusiveMaximumValue}}","minProperties":"Must have {{minimumProperties}} or more items (current items: {{currentProperties}})","maxProperties":"Must have {{maximumProperties}} or fewer items (current items: {{currentProperties}})","minItems":"Must have {{minimumItems}} or more items (current items: {{currentItems}})","maxItems":"Must have {{maximumItems}} or fewer items (current items: {{currentItems}})","uniqueItems":"All items must be unique"},"appearance":"legacy","title":"email","required":false},"required":false,"type":"text","name":"email"}]}]}]');

    constructor(private router: Router, private route: ActivatedRoute) { }

    handleRouteAction = (routeAction: RouteAction) => {
        if (routeAction.action === 'backClicked') {
            // back clicked - navigate to home
            this.router.navigate(['/starterApp/pd/business-processes']);
        }
    }

    ngOnInit() {
        // read resolved config params
        this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
        this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
        this.exclRecentAppIds = this.liveAppsConfig.recentExcludedAppIds;
        this.claims = this.route.snapshot.data.claims;
        this.groups = this.route.snapshot.data.groups;
        this.roles = this.route.snapshot.data.roles;
        this.access = this.route.snapshot.data.access;
        this.customFormDefs = this.route.snapshot.data.customFormDefs;
        this.sandbox = this.claims.primaryProductionSandbox;
        this.caseRef = this.route.snapshot.params.caseRef;
        this.appId = this.route.snapshot.params.appId;
        this.typeId = this.route.snapshot.params.typeId;
        this.workitemId = this.route.snapshot.params.workitemId;
    }

}
