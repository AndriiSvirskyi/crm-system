import { Flex } from "components/User/Flex";
import router, { useRouter } from "next/router";


export default function Pagination({employeesPerPage, totalEmployees, paginate}) {
    const pageNumbers = [];
    const {pathname} = useRouter()
    

for(let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++){
    pageNumbers.push(i);
}

return (
    <div>
        <Flex>
    {pageNumbers.map((number)=> (
            
        
<button key={number} onClick={()=> paginate(number)}>
{number}
        </button>
    ))}
</Flex>

</div>
  )
}
