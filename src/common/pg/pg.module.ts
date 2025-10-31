import { Global, Module, OnModuleDestroy, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg'; // Pool para melhor desempenho e escalabilidade
import { PG_CLIENT } from './pg.constants'; // constante para o token


@Global()
@Module({
  // Importa ConfigModule para disponibilizar ConfigService
  imports: [ConfigModule], 
  providers: [
    {
      provide: PG_CLIENT,
      // Injeta ConfigService na useFactory
      useFactory: async (configService: ConfigService): Promise<Pool> => {
        const pool = new Pool({
          user: configService.get<string>('DATABASE_USER'),
          host: configService.get<string>('DATABASE_HOST'),
          database: configService.get<string>('DATABASE_NAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          port: configService.get<number>('DATABASE_PORT'),
        });

        // O pool gerencia a conexão automaticamente, mas você pode testar a conexão:
        try {
            await pool.connect(); 
            console.log('PostgreSQL Pool conectado com Sucesso.');
        } catch (error) {
            console.error('Falha ao conectar ao PostgreSQL Pool:', error);
        }

        return pool;
      },
      // ConfigService precisa ser injetado na useFactory
      inject: [ConfigService], 
    },
  ],
  exports: [PG_CLIENT],
})
export class PgModule implements OnModuleDestroy {
   // Injetando a instância do pool no construtor do módulo
  constructor(@Inject(PG_CLIENT) private readonly pool: Pool) {}

  /**
   * Hook de ciclo de vida chamado antes que o módulo seja destruído (e a aplicação encerrada).
   * Usado para fechar o pool de conexões.
   */
  // para efeito de desenvolvimento utilizar sem assync await
  // mas em produção é necessario utilizar async onModuleDestroy() e await this.pool.end()
  onModuleDestroy() {
    if (this.pool) {
      console.log('Fechando o pool de conexões PostgreSQL...');
      // O método .end() drena o pool de todos os clientes ativos e os desconecta.
      this.pool.end(); 
      console.log('Pool de conexões PostgreSQL fechado.');
    }
  }
}
