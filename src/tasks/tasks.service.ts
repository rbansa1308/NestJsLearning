import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetSearchFilterDto } from './dto/get-serach-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Task not found', id);
    return found;
  }

  async getTasks(filterDto: GetSearchFilterDto): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto);
  }
  createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    //const found = await this.getTaskById(id);
    //await this.taskRepository.remove(found); ==> another method

    const deleted = await this.taskRepository.delete(id);
    if (deleted.affected === 0)
      throw new NotFoundException('Task not found', id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
