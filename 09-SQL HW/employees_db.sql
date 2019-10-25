select * from department;
select * from dept_emp;
select * from dept_manager;
select * from employees;
select * from salaries;
select * from titles;

ALTER TABLE department
ADD PRIMARY KEY dept_no;

ALTER TABLE employees
ADD PRIMARY KEY emp_no;

--1. List the following details of each employee:
---employee number, last name, first name, gender, and salary.
SELECT employees.emp_no, last_name, first_name, gender, salary
FROM employees 
	INNER JOIN salaries
		ON employees.emp_no = salaries.emp_no;

--2. List employees who were hired in 1986.
SELECT last_name, first_name, hire_date 
FROM employees
WHERE hire_date BETWEEN '1986-01-01' AND '1986-12-31';

--3. List the manager of each department with the following information: 
---department number, department name, the manager's employee number, last name, first name,
---and start and end employment dates.
----dept_manager, employees, department,
SELECT dept_manager.dept_no, dept_name, dept_manager.emp_no, last_name, first_name, from_date, to_date
FROM dept_manager
	INNER JOIN department
		ON dept_manager.dept_no = department.dept_no 
	INNER JOIN employees 
		on dept_manager.emp_no = employees.emp_no;

--4. List the department of each employee with the following information: 
---employee number, last name, first name, and department name.
SELECT employees.emp_no, last_name, first_name, dept_name
FROM employees
	INNER JOIN dept_emp
		ON employees.emp_no = dept_emp.emp_no 
	INNER JOIN department
		on dept_emp.dept_no = department.dept_no
ORDER BY last_name;
	

--5. List all employees whose first name is "Hercules" and last names begin with "B."
SELECT first_name, last_name 
FROM employees
WHERE first_name = 'Hercules' and last_name like 'B%'
ORDER BY last_name;

--6. List all employees in the Sales department
---including their employee number, last name, first name, and department name.
SELECT employees.emp_no, last_name, first_name, dept_name
FROM employees
	INNER JOIN dept_emp 
		on employees.emp_no = dept_emp.emp_no
	INNER JOIN department
		on dept_emp.dept_no = department.dept_no
WHERE dept_name = 'Sales';

--7. List all employees in the Sales and Development departments,including their 
---employee number, last name, first name, and department name.
SELECT employees.emp_no, last_name, first_name, dept_name
FROM employees
	INNER JOIN dept_emp 
		on employees.emp_no = dept_emp.emp_no
	INNER JOIN department
		on dept_emp.dept_no = department.dept_no
WHERE dept_name = 'Sales' or dept_name = 'Development';

--8. In descending order, list the frequency count of employee last names,
--i.e., how many employees share each last name.
SELECT last_name, count(last_name) as last_name_count
FROM employees
group by last_name
order by last_name DESC;