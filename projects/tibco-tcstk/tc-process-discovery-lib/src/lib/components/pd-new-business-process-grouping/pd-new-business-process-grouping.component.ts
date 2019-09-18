import { Component, OnInit, Injectable, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup } from '@angular/forms';

/**
 * Json node data with nested structure. Each node has a name and a value or a list of children
 */
export class FileNode {
    children: FileNode[];
    name: string;
    isParent: boolean;
}

export class TreeData {
    nestedTreeControl: NestedTreeControl<FileNode>;
    nestedDataSource: MatTreeNestedDataSource<FileNode>;
    storage: FileDatabase;
}

@Injectable()
export class FileDatabase {
    dataChange = new BehaviorSubject<FileNode[]>([]);

    get data(): FileNode[] { return this.dataChange.value; }

    constructor() {
        
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `FileNode`.
     */
    buildFileTree(obj: { [key: string]: any }, level: number): FileNode[] {
        return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new FileNode();
            node.name = key;

            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildFileTree(value, level+1);
                    node.isParent = true;
                } else {
                    node.name = value;
                    node.isParent = false;
                }
            }
            return accumulator.concat(node);
        }, []);
    }

    insertGroup(name: string) {
        const node = new FileNode();
        node.name = name;
        node.isParent = true;
        this.data.push(node);
        this.dataChange.next(this.data);
    }

    refreshTree = (): void => {
        const tempData = this.data;
        this.dataChange.next([]);
        this.dataChange.next(tempData);
    }

    updateItem(node: FileNode, name: string) {
        node.name = name;
        this.refreshTree();
    }
}

@Component({
    selector: 'pd-new-business-process-grouping',
    templateUrl: './pd-new-business-process-grouping.component.html',
    styleUrls: ['./pd-new-business-process-grouping.component.css']
})

export class PdNewBusinessProcessGroupingComponent implements OnInit{

    public trees: TreeData[] = [];
    @Input() form: FormGroup;
    @Input() avActivities: FileNode[];

    connectedTo = ['availableActivites'];

    ngOnInit(): void {

    }

    constructor() {
    }

    public showGrouping = (): void => {
        if (this.form.get('enable').value && this.avActivities.length === 0){
            console.log("Obtain activities");
        }
        return this.form.get('enable').value;
    }

    hasNestedChild = (index: number, nodeData: FileNode) => 
        nodeData.isParent;

    private _getChildren = (node: FileNode) => node.children;
    newGroup = (index: number, nodeData: FileNode) => 
        nodeData.name === '' && nodeData.isParent;

    public addGroup = (): void => {
        let element: TreeData = new TreeData();
        element.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
        element.nestedDataSource = new MatTreeNestedDataSource();
        element.storage = new FileDatabase();
        element.storage.dataChange.subscribe(data => element.nestedDataSource.data = data); 
        element.storage.insertGroup('');

        this.trees.push(element);
    }

    saveNode(node: FileNode, itemValue: string) {
        this.trees[this.trees.length-1].storage.updateItem(node!, itemValue);
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            if (event.container.id.startsWith('tree-')){
                const index: number = +event.container.id.substring(5);
                let tree: FileDatabase = this.trees[index].storage;
                tree.refreshTree();
            }
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
            this.trees[0].storage.refreshTree();
            this.trees[1].storage.refreshTree();
        }
    }
}