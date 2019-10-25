CREATE TABLE department(
	dept_no varchar(10),
	dept_name varchar(30) 
);

select * from department;

CREATE TABLE dept_emp(
	emp_no int,
	dept_no varchar,
	from_date date,
	to_date date
);

select * from dept_emp;

CREATE TABLE dept_manager(
	dept_no varchar,
	emp_no int,
	from_date date, 
	to_date date
);

select * from dept_manager;

CREATE TABLE employees(
	emp_no int,
	birth_date date,
	first_name varchar,
	last_name varchar,
	gender varchar,
	hire_date date
);

select * from employees;

CREATE TABLE salaries(
	emp_no int,
	salary int,
	from_date date, 
	to_date date
);

select * from salaries;

CREATE TABLE titles(
	emp_no int,
	title varchar,
	from_date date, 
	to_date date
);

select * from titles;
