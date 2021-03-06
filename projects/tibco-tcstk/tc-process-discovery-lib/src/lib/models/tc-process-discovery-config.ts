import { Deserializable } from '@tibco-tcstk/tc-core-lib';

export class ProcessDiscoveryConfig implements Deserializable {
    id: string;
    version: string;
    uiAppId: string;
    datasourceAppId: string;
    creatorAppId: string;
    validateActionAppId: string;
    
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

