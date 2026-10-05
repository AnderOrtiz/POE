export interface Client {
    id: number;
    name: string;
    email: string;
}

export class ClienteModel {
    private clients: Client[] = [];
    private currentId: number = 1;

    //Regla de negocios: Ingresar clientes
    public addClientes(name: string, email: string): Client {
        const newClient: Client = {
            id: this.currentId++,
            name,
            email,
        };
        this.clients.push(newClient);
        return newClient
    };


    public getAllClients(): Client[] {
        return this.clients
    }

    public getClientesById(id: number): Client | undefined {
        return this.clients.find((client) => { client.id === id })
    };
};