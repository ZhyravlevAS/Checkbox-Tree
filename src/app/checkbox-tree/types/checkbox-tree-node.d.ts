declare interface CheckboxTreeNode {
  id: string | number;
  name: string;
  isOpen?: boolean;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  children?: CheckboxTreeNode[];
  parentId?: string | number;
  data?: any;
}
