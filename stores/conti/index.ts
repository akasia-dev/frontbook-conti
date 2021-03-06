import {
  IContiStoreComponentProps,
  IContiStoreComponentPropTypes
} from 'components/conti/interface'
import { ServiceStore } from 'interfaces/service'

export class Conti {
  protected store!: ServiceStore

  isEditMode = false

  selectedComponent: string | null = null
  componentPropTypes: IContiStoreComponentPropTypes = {}
  componentProps: IContiStoreComponentProps = {}
}
