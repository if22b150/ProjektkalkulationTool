import {AResourceService} from "../../services/a-resource.service";
import {AModel} from "../../models/a-model.model";
import {Directive, OnInit} from "@angular/core";

@Directive() // so that we can use ngOnInit
export abstract class AResourceView<M extends AModel> implements OnInit {
  service: AResourceService<M>

  protected constructor(service: AResourceService<M>) {
    this.service = service
  }

  ngOnInit() {
    if(!this.service.models)
      this.service.getAll()
  }
}
