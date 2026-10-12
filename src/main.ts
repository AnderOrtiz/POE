import { TareaController } from './controllers/tarea.controller.js'
import { StorageService } from './services/storage.service.js'
import { TareaView } from './views/tarea.view.js'

new TareaController(new TareaView('#app'), new StorageService());
