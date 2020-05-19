import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CheckboxTreeService } from '../../services/checkbox-tree.service';
import { CheckboxTreeRoot } from './checkbox-tree-root';

@Component({
  selector: 'app-checkbox-tree-root',
  templateUrl: './checkbox-tree-root.component.html',
})
export class CheckboxTreeRootComponent extends CheckboxTreeRoot implements OnDestroy {

  constructor(protected checkboxTreeService: CheckboxTreeService,
              protected cdr: ChangeDetectorRef) {
    super(checkboxTreeService, cdr);
  }

  /**
   * Лайв-хук компонента. Вызываем destroyComponent
   * и уничтажаем всех подписчиков
   */
  public ngOnDestroy(): void {
    super.destroyComponent();
  }

  /**
   * Установка данных
   * @param data
   */
  public setData(data: CheckboxTreeNode[]): void {
    super.initComponent(data);
  }

  /**
   * Получить элемент по ID
   * @param id
   */
  public get(id: string | number): CheckboxTreeNode {
    return this.getNode(id);
  }

  /**
   * Скрыть / показать дерево по ID
   * @param id
   * @param value
   */
  public onToggleNode(id: string | number, value: boolean): void {
    this.toggleNode(id, value);
  }

  /**
   * Изменить состояние чекбокса по ID
   * @param id
   * @param value
   */
  public onChangeCheckbox(id: string | number, value: boolean): void {
    this.changeCheckbox(id, value);
  }

  /**
   * Событие изменения состояния чекбокса
   */
  public get onChangeCheckboxEvent(): Subject<ChangeCheckboxEvent> {
    return this.changeCheckboxEvent;
  }

  /**
   * Событие изменения дерева (скрыть / показать)
   */
  public get onToggleNodeEvent(): Subject<CheckboxTreeNode> {
    return this.toggleNodeEvent;
  }

  /**
   * Установка флага чтения / записи данных в localStorage
   * По умолчанию true
   * @param value
   */
  public set localStorage(value: boolean) {
    this.readLocalStorage = value;
  }
}
