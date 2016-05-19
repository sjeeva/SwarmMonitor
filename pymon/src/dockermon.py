import json
import docker


def printCpuStats(stats):
    print("CPU Stats:")
    print("  System CPU Usage: ", stats['cpu_stats']['system_cpu_usage'])
    print("  CPU Usage: Kernel Mode: {0}, User Mode: {1}, Per CPU: {2}, Total: {3}".format(
                                      stats['cpu_stats']['cpu_usage']['usage_in_kernelmode'],
                                      stats['cpu_stats']['cpu_usage']['usage_in_usermode'],
                                      stats['cpu_stats']['cpu_usage']['percpu_usage'],
                                      stats['cpu_stats']['cpu_usage']['total_usage']
                                ))
    return

cli = docker.Client(base_url='52.53.214.214:4000')

#with open('containers.json') as file :
#     data = json.load(file)
  
data = cli.containers()
print("Total {0} containers".format(len(data)))

for row in data:
    cId = row['Id']
    print('Container ID: ', cId)
    print('Names: ', row['Names'][0])
    stats = cli.stats(cId, bool(0), bool(0))
    print('{0} :  {1}'.format('read', stats['read']))
    printCpuStats(stats)
    print("")
