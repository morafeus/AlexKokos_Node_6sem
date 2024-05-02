import { Body, ForbiddenException, HttpCode, HttpStatus, Injectable, Req, UseGuards, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CourseDto } from "src/auth/dto/course.dto";
import { Test } from "@nestjs/testing";



@Injectable()
export class CourseService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) {}

    async getall(name, price, descipline, page, limit) {
        let courses;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

    
        if(!price && !descipline && !name){
            courses = await this.prisma.courses.findMany({skip:offset, take:limit,
                select: {
                course_id: true,
                course_name: true,
                course_cost: true,
                course_description: true,
                course_descipline: true,
                Desciplines: {select: {descipline_name: true}},
                }
            });
        }
        if(price != 0 && descipline == 0&& !name){
            console.log(price);
            if(price == 1)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    select: {
                        course_id: true,
                        course_name: true,
                        course_cost: true,
                        course_description: true,
                        course_descipline: true,
                        Desciplines: {select: {descipline_name: true}},
                        },
                    orderBy: 
                        {
                        course_cost: 'desc'
                        },
                })
            if(price == 2)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'asc'
                        },
                })
        }
        if(price == 0 && descipline != 0 && !name)
        {
            courses = await this.prisma.courses.findMany({
                skip:offset, take:limit,
                where: {
                    course_descipline: +descipline - 1
                }
            })
        }

        if(price == 0 && descipline == 0 && name)
        {
            courses =await this.prisma.courses.findMany({
                skip:offset, take:limit,
                where: {
                    course_name: {
                        contains: name
                    }
                }
            });
        }

        if(price != 0 && descipline != 0&& !name){
            console.log(price);
            if(price == 1)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'desc'
                        },
                    where: {
                        course_descipline: +descipline -1
                    }
                })
            if(price == 2)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'asc'
                        },
                    where: {
                        course_descipline: +descipline - 1
                    }
                })
        }
        if(price != 0 && descipline == 0&& name){
            console.log(price);
            if(price == 1)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'desc'
                        },
                    where: {
                        course_name: {
                            contains: name
                        }
                    }
                })
            if(price == 2)
                courses = await this.prisma.courses.findMany({
                    orderBy: 
                        {
                        course_cost: 'asc'
                        },
                    where: {
                        course_name: {
                            contains: name
                        }
                    }
                })
        }
        if(price == 0 && descipline != 0&& name){
            courses = await this.prisma.courses.findMany({
                skip:offset, take:limit,
                where: {
                    course_descipline: +descipline - 1,
                    course_name: {
                        contains: name
                    }
                }
            })
    
        }
        if(price != 0 && descipline != 0&& name){
            console.log(price);
            if(price == 1)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'desc'
                        },
                    where: {
                        course_descipline: +descipline -1,
                        course_name: {
                            contains: name
                        }
                    }
                })
            if(price == 2)
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    orderBy: 
                        {
                        course_cost: 'asc'
                        },
                    where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        }
                    }
                })
        }
    
        

       

        return courses;
    }


    async getallUser(name, price, descipline, page, limit, user, role) {
        let courses;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        if(role == 'student')
        {
            if(price == 0 && descipline == 0 && !name){
                courses = await this.prisma.courses.findMany({skip:offset, take:limit,
                    where: {
                        StudentToCourse: {
                          some: {
                            student_id: +user
                          }
                        }
                    }
            });
            }
            if(price != 0 && descipline == 0 && !name){
                console.log(price);
                if(price == 1)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'desc'
                            },
                            where: {
                                StudentToCourse: {
                                  some: {
                                    student_id: +user
                                  }
                                }
                            }
                    })
                if(price == 2)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'asc'
                            },
                            where: {
                                StudentToCourse: {
                                  some: {
                                    student_id: +user
                                  }
                                }
                            }
                    })
            }
            if(price == 0 && descipline != 0 && !name)
            {
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    where: {
                        course_descipline: +descipline - 1,
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }
                })
            }

            if(price == 0 && descipline == 0 && name)
            {
                courses =await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    where: {
                        course_name: {
                            contains: name
                        },
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }
                });
            }

            if(price != 0 && descipline != 0&& !name){
                console.log(price);
                if(price == 1)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'desc'
                            },
                        where: {
                            course_descipline: +descipline -1,
                            StudentToCourse: {
                                some: {
                                  student_id: +user
                                }
                              }
                        }
                    })
                if(price == 2)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'asc'
                            },
                        where: {
                            course_descipline: +descipline - 1,
                            StudentToCourse: {
                                some: {
                                  student_id: +user
                                }
                              }
                        }
                    })
            }
            if(price != 0 && descipline == 0&& name){
                console.log(price);
                if(price == 1)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'desc'
                            },
                        where: {
                            course_name: {
                                contains: name
                            },
                            StudentToCourse: {
                                some: {
                                  student_id: +user
                                }
                              }
                        }
                    })
                if(price == 2)
                    courses = await this.prisma.courses.findMany({
                        orderBy: 
                            {
                            course_cost: 'asc'
                            },
                        where: {
                            course_name: {
                                contains: name
                            },
                            StudentToCourse: {
                                some: {
                                  student_id: +user
                                }
                              }
                        }
                    })
            }
            if(price == 0 && descipline != 0&& name){
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        },
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }
                })
        
            }
            if(price != 0 && descipline != 0&& name){
                console.log(price);
                if(price == 1)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'desc'
                            },
                        where: {
                            course_descipline: +descipline -1,
                            course_name: {
                                contains: name
                            },
                            StudentToCourse: {
                                some: {
                                  student_id: +user
                                }
                              }
                        }
                    })
                if(price == 2)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'asc'
                            },
                        where: {
                            course_descipline: +descipline - 1,
                            course_name: {
                                contains: name
                            },
                            StudentToCourse: {
                                some: {
                                  student_id: +user
                                }
                              }
                        }
                    })
            }
        }
        if(role == 'teacher')
        {
            if(price == 0 && descipline == 0 && !name){
                courses = await this.prisma.courses.findMany({skip:offset, take:limit,
                    where: {
                        TeacherToCourse: {
                          some: {
                            teacher_id: +user
                          }
                        }
                    }
            });
            }
            if(price != 0 && descipline == 0 && !name){
                console.log(price);
                if(price == 1)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'desc'
                            },
                            where: {
                                TeacherToCourse: {
                                  some: {
                                    teacher_id: +user
                                  }
                                }
                            }
                    })
                if(price == 2)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'asc'
                            },
                            where: {
                                TeacherToCourse: {
                                  some: {
                                    teacher_id: +user
                                  }
                                }
                            }
                    })
            }
            if(price == 0 && descipline != 0 && !name)
            {
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    where: {
                        course_descipline: +descipline - 1,
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }
                })
            }

            if(price == 0 && descipline == 0 && name)
            {
                courses =await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    where: {
                        course_name: {
                            contains: name
                        },
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }
                });
            }

            if(price != 0 && descipline != 0&& !name){
                console.log(price);
                if(price == 1)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'desc'
                            },
                        where: {
                            course_descipline: +descipline -1,
                            TeacherToCourse: {
                                some: {
                                  teacher_id: +user
                                }
                              }
                        }
                    })
                if(price == 2)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'asc'
                            },
                        where: {
                            course_descipline: +descipline - 1,
                            TeacherToCourse: {
                                some: {
                                  teacher_id: +user
                                }
                              }
                        }
                    })
            }
            if(price != 0 && descipline == 0&& name){
                console.log(price);
                if(price == 1)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'desc'
                            },
                        where: {
                            course_name: {
                                contains: name
                            },
                            TeacherToCourse: {
                                some: {
                                  teacher_id: +user
                                }
                              }
                        }
                    })
                if(price == 2)
                    courses = await this.prisma.courses.findMany({
                        orderBy: 
                            {
                            course_cost: 'asc'
                            },
                        where: {
                            course_name: {
                                contains: name
                            },
                            TeacherToCourse: {
                                some: {
                                  teacher_id: +user
                                }
                              }
                        }
                    })
            }
            if(price == 0 && descipline != 0&& name){
                courses = await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        },
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }
                })
        
            }
            if(price != 0 && descipline != 0&& name){
                console.log(price);
                if(price == 1)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'desc'
                            },
                        where: {
                            course_descipline: +descipline -1,
                            course_name: {
                                contains: name
                            },
                            TeacherToCourse: {
                                some: {
                                  teacher_id: +user
                                }
                              }
                        }
                    })
                if(price == 2)
                    courses = await this.prisma.courses.findMany({
                        skip:offset, take:limit,
                        orderBy: 
                            {
                            course_cost: 'asc'
                            },
                        where: {
                            course_descipline: +descipline - 1,
                            course_name: {
                                contains: name
                            },
                            TeacherToCourse: {
                                some: {
                                  teacher_id: +user
                                }
                              }
                        }
                    })
            }
        }
        return courses;
    }

    async getOne(id: number){
       
        const course = await this.prisma.courses.findFirst({
            where: {course_id : +id},
            select: {
                course_id: true,
                course_name: true,
                course_cost: true,
                course_description: true,
                Desciplines: {select: {descipline_name: true}},
                Tests: {
                    select: {
                        test_id: true,
                        test_name: true,
                        test_desc: true
                    }
                },
                TeacherToCourse: {
                    select: {
                      Teachers: {
                        select: {
                          fio: true,
                          Desciplines: {select: {descipline_name: true}},
                        }
                    }
                }
            } 
                
            },
        })
        console.log(course);
        return course;
    }

    @HttpCode(HttpStatus.OK)
    async create(dto: CourseDto) {
        const descipline = await this.prisma.courses.findFirst({
            where:{
                course_name: dto.name
            }
        })
        if(descipline)
            throw new ForbiddenException("this course is already exist");
       
        let course_new = await this.prisma.courses.create({
            data:{
                course_name: dto.name,
                course_cost: dto.cost,
                course_description: dto.description,
                course_descipline: dto.descipline
            }
        })
        return course_new;
    
    
           
        
    }
    

}