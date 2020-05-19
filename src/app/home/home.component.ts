import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { CheckboxTreeRootComponent } from '../checkbox-tree/components/checkbox-tree-root/checkbox-tree-root.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  public nodeId: string = 'node-1';

  /**
   * Входные данные
   */
  public data: CheckboxTreeNode[] = [
    {
      id: 'node-1',
      name: 'node-1',
      isOpen: false,
      isChecked: false,
      data: {foo: 'bar'},
    },
    {
      id: 'node-1-1',
      parentId: 'node-1',
      name: 'node-1-1',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-1-1-1',
      parentId: 'node-1-1',
      name: 'node-1-1-1',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-1-1-2',
      parentId: 'node-1-1',
      name: 'node-1-1-2',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-1-1-2-1',
      parentId: 'node-1-1-2',
      name: 'node-1-1-2-1',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-1-1-2-2',
      parentId: 'node-1-1-2',
      name: 'node-1-1-2-2',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-1-2',
      parentId: 'node-1',
      name: 'node-1-2',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-1-2-1',
      parentId: 'node-1-2',
      name: 'node-1-2-1',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-1-2-2',
      parentId: 'node-1-2',
      name: 'node-1-2-2',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2',
      name: 'node-2',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-1',
      parentId: 'node-2',
      name: 'node-2-1',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2',
      parentId: 'node-2',
      name: 'node-2-2',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-1',
      parentId: 'node-2-2',
      name: 'node-2-2-1',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-2',
      parentId: 'node-2-2',
      name: 'node-2-2-2',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-3',
      parentId: 'node-2-2',
      name: 'node-2-2-3',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-4',
      parentId: 'node-2-2',
      name: 'node-2-2-4',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-5',
      parentId: 'node-2-2',
      name: 'node-2-2-5',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-6',
      parentId: 'node-2-2',
      name: 'node-2-2-6',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-7',
      parentId: 'node-2-2',
      name: 'node-2-2-7',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-8',
      parentId: 'node-2-2',
      name: 'node-2-2-8',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-9',
      parentId: 'node-2-2',
      name: 'node-2-2-9',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-10',
      parentId: 'node-2-2',
      name: 'node-2-2-10',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-11',
      parentId: 'node-2-2',
      name: 'node-2-2-11',
      isOpen: false,
      isChecked: false,
    },
    {
      id: 'node-2-2-12',
      parentId: 'node-2-2',
      name: 'node-2-2-12',
      isOpen: false,
      isChecked: false,
    },
  ];

  /**
   * Выбранные элементы
   */
  public selectedData: CheckboxTreeNode[] = [];

  /**
   * Ссылка на компонент дерева
   */
  @ViewChild(CheckboxTreeRootComponent)
  public tree: CheckboxTreeRootComponent;

  private observable: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    //
  }

  /**
   * Поиск tree
   */
  public ngAfterViewInit(): void {
    if (!this.tree) {
      return;
    }

    /**
     * =====================================================
     * 1. Подписываемся на события
     */

    this.observable.push(this.tree.onChangeCheckboxEvent.subscribe((data: ChangeCheckboxEvent) => {
      console.log('onChangeCheckboxEvent :::', data);

      this.selectedData = data.lastLevel;

      /**
       * Сообщаем Angular-у об изменениях,
       * поскольку событие onChangeCheckboxEvent
       * будет вызвано при загрузки состояния из localStorage
       */
      this.cdr.detectChanges();
    }));

    this.observable.push(this.tree.onToggleNodeEvent.subscribe((data: CheckboxTreeNode) => {
      /**
       * TODO
       * Можно асинхронно подгружать данные в дерево с сервера
       * при открытии дочернего элемента
       */
      console.log('onToggleNodeEvent :::', data);
    }));

    /**
     * =====================================================
     */

    /**
     * 2. Передаем данные в компонент
     */
    this.tree.setData(this.data);
  }

  public ngOnDestroy(): void {
    for (const observable of this.observable) {
      if (observable instanceof Subscriber) {
        observable.unsubscribe();
      }
    }
  }

  /**
   * =====================================================
   *                МЕТОДЫ ДЛЯ ТЕСТИРОВАНИЯ
   * =====================================================
   */

  public onToggleNode(): void {
    const node = this.tree.get(this.nodeId);

    if (!node) {
      return;
    }

    this.tree.onToggleNode(this.nodeId, !node.isOpen);
  }

  public onChangeCheckbox(): void {
    const node = this.tree.get(this.nodeId);

    if (!node) {
      return;
    }

    this.tree.onChangeCheckbox(this.nodeId, !node.isChecked)
  }
}
