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
        let count;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        console.log('name ' + name + ' price ' + price + ' desc ' + descipline + ' page ' + page + ' limit ' + limit);

    
        if(price == 0 && descipline == 0 && name == ''){
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
            count = await this.prisma.courses.count();
        }
        if(price != 0 && descipline == 0&& !name){
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
                count = await this.prisma.courses.count()
            if(price == 2)
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
                        course_cost: 'asc'
                        },
                })
                count = await this.prisma.courses.count();
        }
        if(price == 0 && descipline != 0 && !name)
        {
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
                where: {
                    course_descipline: +descipline - 1
                }
            })
            count = await this.prisma.courses.count({ where: {
                course_descipline: +descipline - 1
            }});
        }

        if(price == 0 && descipline == 0 && name)
        {
            courses =await this.prisma.courses.findMany({
                skip:offset, take:limit,
                select: {
                    course_id: true,
                    course_name: true,
                    course_cost: true,
                    course_description: true,
                    course_descipline: true,
                    Desciplines: {select: {descipline_name: true}},
                    },
                where: {
                    course_name: {
                        contains: name
                    }
                }
            });
            count = await this.prisma.courses.count({  where: {
                course_name: {
                    contains: name
                }
            }});
        }

        if(price != 0 && descipline != 0&& !name){
            if(price == 1){
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
                    where: {
                        course_descipline: +descipline -1
                    }
                })
                count = await this.prisma.courses.count({ where: {
                    course_descipline: +descipline - 1
                }});
            }
            if(price == 2)
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
                        course_cost: 'asc'
                        },
                    where: {
                        course_descipline: +descipline - 1
                    }
                })
                count = await this.prisma.courses.count({ where: {
                    course_descipline: +descipline - 1
                }});
        }
        if(price != 0 && descipline == 0&& name != ''){
            if(price == 1)
            {
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
                    where: {
                        course_name: {
                            contains: name
                        }
                    }
                })
                count = await this.prisma.courses.count({where: {
                    course_name: {
                        contains: name
                    }
                }});
            }
            if(price == 2)
            {
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
                        course_cost: 'asc'
                        },
                    where: {
                        course_name: {
                            contains: name
                        }
                    }
                })
                count = await this.prisma.courses.count({where: {
                    course_name: {
                        contains: name
                    }
                }});
            }
        }
        if(price == 0 && descipline != 0&& name){
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
                where: {
                    course_descipline: +descipline - 1,
                    course_name: {
                        contains: name
                    }
                }
            })
            count = await this.prisma.courses.count({where: {
                course_descipline: +descipline - 1,
                course_name: {
                    contains: name
                }
            }});
    
        }
        if(price != 0 && descipline != 0&& name){
            console.log(price);
            if(price == 1) {
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
                    where: {
                        course_descipline: +descipline -1,
                        course_name: {
                            contains: name
                        }
                    }
                })
                count = await this.prisma.courses.count({where: {
                    course_descipline: +descipline - 1,
                    course_name: {
                        contains: name
                    }
                }});
                
            }
            if(price == 2)
            {
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
                        course_cost: 'asc'
                        },
                    where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        }
                    }
                })
                count = await this.prisma.courses.count({where: {
                    course_descipline: +descipline - 1,
                    course_name: {
                        contains: name
                    }
                }});
            }
        }
    
        
   

        return {courses, count};
    }


    async getallUser(name, price, descipline, page, limit, user, role) {
        let courses;
        let count = 0
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        if(role == 'student')
        {
            if(price == 0 && descipline == 0 && !name){
                courses = await this.prisma.courses.findMany({skip:offset, take:limit,
                    select: {
                        course_id: true,
                        course_name: true,
                        course_cost: true,
                        course_description: true,
                        course_descipline: true,
                        Desciplines: {select: {descipline_name: true}},
                        },
                    where: {
                        
                        StudentToCourse: {
                          some: {
                            student_id: +user
                          }
                        }
                    }
            });
            count = await this.prisma.courses.count({where: {
                        
                StudentToCourse: {
                  some: {
                    student_id: +user
                  }
                }
            }});
            }
            if(price != 0 && descipline == 0 && !name){
                console.log(price);
                if(price == 1)
                {
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
                            where: {
                                StudentToCourse: {
                                  some: {
                                    student_id: +user
                                  }
                                }
                            }
                    })
                    count = await this.prisma.courses.count({where: {
                        
                        StudentToCourse: {
                          some: {
                            student_id: +user
                          }
                        }
                    }});
                    
                }
                if(price == 2)
                {
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
                    count = await this.prisma.courses.count({where: {
                        
                        StudentToCourse: {
                          some: {
                            student_id: +user
                          }
                        }
                    }});
                }
            }
            if(price == 0 && descipline != 0 && !name)
            {
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
                    where: {
                        course_descipline: +descipline - 1,
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }
                })
                count = await this.prisma.courses.count({where: {
                    course_descipline: +descipline - 1,
                    StudentToCourse: {
                        some: {
                          student_id: +user
                        }
                      }
                }});
            }

            if(price == 0 && descipline == 0 && name)
            {
                courses =await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    select: {
                        course_id: true,
                        course_name: true,
                        course_cost: true,
                        course_description: true,
                        course_descipline: true,
                        Desciplines: {select: {descipline_name: true}},
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
                });
                count = await this.prisma.courses.count({where: {
                    course_name: {
                        contains: name
                    },
                    StudentToCourse: {
                        some: {
                          student_id: +user
                        }
                      }
                }});
            }

            if(price != 0 && descipline != 0&& !name){
                if(price == 1)
                {
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
                        where: {
                            course_descipline: +descipline -1,
                            StudentToCourse: {
                                some: {
                                  student_id: +user
                                }
                              }
                        }
                    })
                    count = await this.prisma.courses.count({  where: {
                        course_descipline: +descipline -1,
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }});
                    
                }
                if(price == 2)
                {
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
                    count = await this.prisma.courses.count({  where: {
                        course_descipline: +descipline -1,
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }});
                }
            }
            if(price != 0 && descipline == 0&& name){
                if(price == 1)
                {
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
                    count = await this.prisma.courses.count({ where: {
                        course_name: {
                            contains: name
                        },
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }});
                }
                if(price == 2)
                {
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
                    count = await this.prisma.courses.count({ where: {
                        course_name: {
                            contains: name
                        },
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }});
                }
            }
            if(price == 0 && descipline != 0&& name){
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
                count = await this.prisma.courses.count({ where: {
                    course_descipline: +descipline - 1,
                    course_name: {
                        contains: name
                    },
                    StudentToCourse: {
                        some: {
                          student_id: +user
                        }
                      }
                }});
        
            }
            if(price != 0 && descipline != 0&& name){
                if(price == 1)
                {
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
                    count = await this.prisma.courses.count({ where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        },
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }});
                    
                }
                if(price == 2)
                {
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
                    count = await this.prisma.courses.count({ where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        },
                        StudentToCourse: {
                            some: {
                              student_id: +user
                            }
                          }
                    }});
                }
            }
        }
        if(role == 'teacher')
        {
            if(price == 0 && descipline == 0 && !name){
                courses = await this.prisma.courses.findMany({skip:offset, take:limit,
                    select: {
                        course_id: true,
                        course_name: true,
                        course_cost: true,
                        course_description: true,
                        course_descipline: true,
                        Desciplines: {select: {descipline_name: true}},
                        },
                    where: {
                        TeacherToCourse: {
                          some: {
                            teacher_id: +user
                          }
                        }
                    }
            });
            count = await this.prisma.courses.count({  where: {
                TeacherToCourse: {
                  some: {
                    teacher_id: +user
                  }
                }
            }});
            }
            if(price != 0 && descipline == 0 && !name){
                if(price == 1)
                {
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
                            where: {
                                TeacherToCourse: {
                                  some: {
                                    teacher_id: +user
                                  }
                                }
                            }
                    })
                    count = await this.prisma.courses.count({  where: {
                        TeacherToCourse: {
                          some: {
                            teacher_id: +user
                          }
                        }
                    }});
                }
                if(price == 2)
                {
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
                    count = await this.prisma.courses.count({  where: {
                        TeacherToCourse: {
                          some: {
                            teacher_id: +user
                          }
                        }
                    }});
                }
            }
            if(price == 0 && descipline != 0 && !name)
            {
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
                    where: {
                        course_descipline: +descipline - 1,
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }
                })
                count = await this.prisma.courses.count({   where: {
                    course_descipline: +descipline - 1,
                    TeacherToCourse: {
                        some: {
                          teacher_id: +user
                        }
                      }
                }});
            }

            if(price == 0 && descipline == 0 && name)
            {
                courses =await this.prisma.courses.findMany({
                    skip:offset, take:limit,
                    select: {
                        course_id: true,
                        course_name: true,
                        course_cost: true,
                        course_description: true,
                        course_descipline: true,
                        Desciplines: {select: {descipline_name: true}},
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
                });
                count = await this.prisma.courses.count({ where: {
                    course_name: {
                        contains: name
                    },
                    TeacherToCourse: {
                        some: {
                          teacher_id: +user
                        }
                      }
                }});
            }

            if(price != 0 && descipline != 0&& !name){
                if(price == 1)
                {
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
                        where: {
                            course_descipline: +descipline -1,
                            TeacherToCourse: {
                                some: {
                                  teacher_id: +user
                                }
                              }
                        }
                    })
                    count = await this.prisma.courses.count({where: {
                        course_descipline: +descipline -1,
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }});
                }
                if(price == 2)
                {
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
                    count = await this.prisma.courses.count({where: {
                        course_descipline: +descipline - 1,
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }});
                }
            }
            if(price != 0 && descipline == 0&& name){
                if(price == 1)
                {
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
                    count = await this.prisma.courses.count({where: {
                        course_name: {
                            contains: name
                        },
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }});
                    
                }
                if(price == 2)
                {
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
                    count = await this.prisma.courses.count({where: {
                        course_name: {
                            contains: name
                        },
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }});
                }
            }
            if(price == 0 && descipline != 0&& name){
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
                count = await this.prisma.courses.count({where: {
                    course_descipline: +descipline - 1,
                    course_name: {
                        contains: name
                    },
                    TeacherToCourse: {
                        some: {
                          teacher_id: +user
                        }
                      }
                }});
        
            }
            if(price != 0 && descipline != 0&& name){
                console.log(price);
                if(price == 1)
                {
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
                    count = await this.prisma.courses.count({where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        },
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }});
                    
                }
                if(price == 2)
            {
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
                    count = await this.prisma.courses.count({where: {
                        course_descipline: +descipline - 1,
                        course_name: {
                            contains: name
                        },
                        TeacherToCourse: {
                            some: {
                              teacher_id: +user
                            }
                          }
                    }});
                }
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
        return course;
    }

    async create(dto: CourseDto) {
        console.log(dto.teacher);
        try{   
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
                    course_cost: +dto.cost,
                    course_description: dto.description,
                    course_descipline: +dto.descipline
                }
                
            });
            await this.prisma.teacherToCourse.create({
                data: {
                    teacher_id: +dto.teacher,
                    course_id: +course_new.course_id
                }
            })
            return course_new; 
        }
        catch(error){
            throw Error();
        }
        
       
    }

    async buyCourse(course_id, user_id)
    {
        const course = await this.prisma.courses.findFirst({
            where: {
                course_id: +course_id
            }
        })
        if(course)
        {
            const student = await this.prisma.students.update({
                where: {
                    user_ident: +user_id
                },
                data: {
                    balance: {
                        decrement: course.course_cost
                    }
                }
            });
            const STC = await this.prisma.studentToCourse.create({
                data: {
                    student_id: student.user_ident,
                    course_id: course.course_id
                }
            })
            return STC
        }
        else 
            throw new ForbiddenException("invalid course");
    }

    async checkIsMy(course_id, user_id)
    {
        const STC = await this.prisma.studentToCourse.findFirst({
            where: {
                course_id: +course_id,
                student_id: +user_id
            }
        })
        console.log(STC);
        return STC
    }
    

}